
<script setup>
/* All Library Import */
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useProductStore } from "@/stores/product";
import { useBrandStore } from "@/stores/brand";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";
import _ from "lodash";
import { Modal } from "bootstrap";
import { useCartStore } from "@/stores/cart";
import { useCustomerStore } from "@/stores/customer";
import { useOrderStore } from "@/stores/order";
import { ErrorMessage } from "vee-validate";

/* All Instance*/
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const customerStore = useCustomerStore();
const router = useRouter();
const swal = inject("$swal");

productStore.router = router;
productStore.swal = swal;

cartStore.swal = swal;
cartStore.router = router;

orderStore.swal = swal;
orderStore.router = router;

/* All Variables */

let cartModal = ref("");
let cartModalObj = null;
let orderModal = ref("");
let orderModalObj = null;

const searchKeyWord = ref("");

const filterFormData = reactive({
  cat_id: "",
  brand_id: "",
});

const cartFormData = reactive({
  product_id: "",
  product_name: "",
  quantity: 1,
  price: 0,
  subtotal: 0,
});

const orderFormData = reactive({
  cus_phone: null,
  payment_method: "cash",
  due_amt: 0,
  pay_amt: 0,
  subtotal: 0,
  discount: 0,
  total: 0,
});

const schema = reactive({
  cus_phone: "required|min:11|max:14",
  payment_method: "required",
  due_amt: "required",
  pay_amt: "required",
  subtotal: "required",
  discount: "required",
  total: "required",
});

/* All Methods */
const openCartModal = (product) => {
  productStore.product = product;
  cartModalObj.show();

  cartFormData.product_id = product.id;
  cartFormData.product_name = product.name;
  cartFormData.price = product.sale_price;
  cartFormData.subtotal = product.sale_price * cartFormData.quantity;
};

const openConfirmOrderModal = () => {
  orderModalObj.show();

  orderFormData.subtotal = parseFloat(cartStore.subtotal);
  orderFormData.pay_amt = parseFloat(cartStore.subtotal);
  orderFormData.due_amt = parseFloat(cartStore.subtotal);
  orderFormData.total = parseFloat(cartStore.subtotal);
};

const confirmOrder = () => {
  console.log(orderFormData);
  orderStore.storeOrder(orderFormData);
  orderModalObj.hide();
  resetOrderModal();

  productStore.getProducts(1, productStore.dataLimit + 2);
  cartStore.getAllCartItems();
};

const resetCartModal = () => {
  cartFormData.product_id = null;
  cartFormData.product_name = null;
  cartFormData.quantity = 1;
  cartFormData.price = 0;
  cartFormData.subtotal = 0;
};

const resetOrderModal = () => {
  orderFormData.cus_phone = null;
  orderFormData.payment_method = "cash";
  orderFormData.pay_amt = 0;
  orderFormData.due_amt = 0;
  orderFormData.subtotal = 0;
  orderFormData.discount = 0;
  orderFormData.total = 0;
};

const increaseQty = () => {
  cartFormData.subtotal = cartFormData.price * cartFormData.quantity;
};

const AddToCart = (cartData) => {
  // console.log(cartData);
  cartStore.storeCart(cartData);
  cartModalObj.hide();
  resetCartModal();
  cartStore.getAllCartItems();
};

const RemoveCartItem = (product_id) => {
  // console.log(product_id);
  cartStore.removeCartItem(product_id);
};

/* Hooks and Computed Property */

onMounted(() => {
  cartModalObj = new Modal(cartModal.value);
  orderModalObj = new Modal(orderModal.value);
  brandStore.getAllBrands();
  customerStore.getAllCustomers();
  categoryStore.getAllCategories();
  productStore.getProducts(1, productStore.dataLimit + 2);
  cartStore.getAllCartItems();
});

watch(
  searchKeyWord,
  _.debounce((current, previous) => {
    productStore.getProducts(
      productStore.pagination.current_page,
      productStore.dataLimit,
      current,
      filterFormData
    );
  }, 500)
);
</script>


<template>
  <div class="page-content">
    <div class="row">
      <div class="col-md-7">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title my-3">Product List</h4>
            <!-- Filter -->
            <div class="row mb-3">
              <div class="col-md-4">
                <select
                  name="cat_id"
                  class="form-select"
                  v-model="filterFormData.cat_id"
                  @change="
                    productStore.getProducts(
                      productStore.pagination.current_page,
                      productStore.dataLimit,
                      searchKeyWord,
                      filterFormData
                    )
                  "
                >
                  <option value="">Select Category</option>
                  <option
                    :value="category.category_id"
                    v-for="(category, index) in categoryStore.categories"
                    :key="category.category_id"
                  >
                    {{ index + 1 }}. {{ category.category_name }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <select
                  name="brand_id"
                  class="form-select"
                  v-model="filterFormData.brand_id"
                  @change="
                    productStore.getProducts(
                      productStore.pagination.current_page,
                      productStore.dataLimit,
                      searchKeyWord,
                      filterFormData
                    )
                  "
                >
                  <option value="">Select Brand</option>
                  <option
                    :value="brand.brand_id"
                    v-for="(brand, index) in brandStore.brands"
                    :key="brand.brand_id"
                  >
                    {{ index + 1 }}. {{ brand.brand_name }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <input
                  type="search"
                  class="form-control"
                  v-model="searchKeyWord"
                  placeholder="Search Product.."
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Product List -->
        <div class="row">
          <div
            class="col-md-4"
            v-for="(product, index) in productStore.products"
            :key="index"
          >
            <a
              href=""
              class="btn btn-sm"
              @click.prevent="openCartModal(product)"
            >
              <div class="card">
                <div class="card-content">
                  <img
                    :src="product.file"
                    alt="product-image img-fluid"
                    style="width: 50%; height: 50%"
                  />
                  <div class="card-body text-center">
                    <h4 class="card-title">{{ product.name }}</h4>
                    <span
                      class="badge"
                      :class="product.stock > 0 ? 'bg-success' : 'bg-danger'"
                    >
                      <span v-if="product.stock > 0">Available</span>
                      <span v-else>Out of Stock</span>
                      :{{ product.stock }}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title my-3">Cart Product List</h4>
            <div class="row">
              <!-- Cart Product List -->
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr class="bg-primary text-white">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col" style="width: 120px">Qty</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col"><i class="fas fa-edit"></i></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(cart, index) in cartStore.carts"
                        :key="cart.id"
                      >
                        <td scope="row">{{ index + 1 }}</td>
                        <td scope="row">{{ cart.product?.name }}</td>
                        <td scope="row">{{ cart.product?.code }}</td>
                        <td scope="row">{{ cart.product?.sale_price }}</td>
                        <td style="width: 120px">
                          <span class="btn btn-sm btn-danger fw-bold">
                            <i
                              class="fas fa-minus"
                              @click.prevent="
                                cartStore.decreaseCartItem(cart.id)
                              "
                            ></i>
                          </span>
                          {{ cart.quantity }}
                          <span class="btn btn-sm btn-success fw-bold">
                            <i
                              class="fas fa-plus"
                              @click.prevent="
                                cartStore.increaseCartItem(cart.id)
                              "
                            ></i>
                          </span>
                        </td>
                        <td scope="row">{{ cart.subtotal }}</td>
                        <td scope="row">
                          <a
                            href=""
                            class="btn btn-sm btn-danger"
                            @click.prevent="RemoveCartItem(cart.id)"
                            ><i class="fas fa-trash"></i
                          ></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Cart Total -->
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">SUBTOTAL</div>
                      <div class="col-md-6 text-end">
                        {{ cartStore.subtotal }} BDT
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">Discount</div>
                      <div class="col-md-6 text-end">0 BDT</div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">SD Amt.</div>
                      <div class="col-md-6 text-end">0 BDT</div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">Vat Amt.</div>
                      <div class="col-md-6 text-end">0 BDT</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-md-6 fw-bold">GRAND TOTAL</div>
                      <div class="col-md-6 text-end text-danger fw-bold">
                        {{ cartStore.subtotal }} /-BDT
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Confirm Button -->
              <div class="row">
                <div class="d-flex justify-content-center align-items-center">
                  <button
                    class="btn btn-primary"
                    @click.prevent="openConfirmOrderModal()"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Product Modal -->

  <div
    class="modal fade"
    id="addToCartModal"
    tabindex="-1"
    aria-labelledby="addToCartModalLabel"
    aria-hidden="true"
    ref="cartModal"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addToCartModalLabel">
            {{ productStore.product?.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-content">
              <div class="row">
                <div class="col-md-4">
                  <img
                    :src="productStore.product?.file"
                    class="card-img-top img-fluid"
                    alt="product-image"
                  />
                </div>
                <div class="col-md-8">
                  <div class="row py-2">
                    <div class="col-md-6">
                      <label
                        for="original-price"
                        class="form-label text-primary"
                        >Original Price: (BDT)</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        :value="productStore.product?.original_price"
                        name="original_price"
                        disabled
                      />
                    </div>

                    <div class="col-md-6">
                      <label for="sale-price" class="form-label text-primary"
                        >Sale Price: (BDT)</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        :value="productStore.product?.sale_price"
                        name="sale_price"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="stock" class="form-label text-primary"
                        >Current Stock:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        :value="productStore.product?.stock"
                        name="stock"
                        disabled
                      />
                    </div>

                    <div class="col-md-6">
                      <label for="sale-quantity" class="form-label text-primary"
                        >Sale Quantity:</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        value=""
                        name="quantity"
                        v-model="cartFormData.quantity"
                        @change="increaseQty()"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <p class="form-label text-primary">BarCode:</p>
                      <img
                        :src="productStore.product?.barcode"
                        class="img-fluid"
                        alt="product-image"
                      />
                    </div>

                    <div class="col-md-6">
                      <p for="sale-subtotal" class="form-label text-primary">
                        Subtotal:
                      </p>
                      <input
                        type="number"
                        class="form-control"
                        value=""
                        name="subtotal"
                        v-model="cartFormData.subtotal"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="AddToCart(cartFormData)"
            :disabled="productStore.product?.stock == 0"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Order Confirm Modal -->

  <div
    class="modal fade"
    id="confirmOrderModal"
    tabindex="-1"
    aria-labelledby="confirmOrderModalLabel"
    aria-hidden="true"
    ref="orderModal"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <vee-form
          :validation-schema="schema"
          @submit="confirmOrder"
          class="mt-2"
        >
          <div class="modal-header">
            <h5 class="modal-title" id="confirmOrderModalLabel">
              {{ productStore.product?.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cus_phone" class="form-label">Customer Phone</label>
                <vee-field
                  type="tel"
                  name="cus_phone"
                  v-model="orderFormData.cus_phone"
                  class="form-control"
                  placeholder="Enter Phone Number"
                />
                <ErrorMessage class="text-danger" name="cus_phone" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="payment_method" class="form-label"
                  >Payment Method</label
                >
                <vee-field
                  as="select"
                  name="payment_method"
                  v-model="orderFormData.payment_method"
                  class="form-select"
                >
                  <option value="">Select Method</option>
                  <option
                    :value="method"
                    v-for="(method, index) in orderStore.payment_methods"
                    :key="index"
                  >
                    {{ method }}
                  </option>
                </vee-field>
                <ErrorMessage class="text-danger" name="payment_method" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="pay_amt" class="form-label"
                  >Pay Amount (BDT):</label
                >
                <vee-field
                  type="number"
                  name="pay_amt"
                  v-model="orderFormData.pay_amt"
                  class="form-control"
                  min="0"
                />
                <ErrorMessage class="text-danger" name="pay_amt" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="due_amt" class="form-label"
                  >Due Amount (BDT):</label
                >
                <vee-field
                  type="number"
                  name="due_amt"
                  v-model="orderFormData.due_amt"
                  class="form-control"
                  min="0"
                />
                <ErrorMessage class="text-danger" name="due_amt" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="subtotal" class="form-label">Subtotal (BDT):</label>
                <vee-field
                  type="number"
                  name="subtotal"
                  v-model="orderFormData.subtotal"
                  class="form-control"
                  min="0"
                />
                <ErrorMessage class="text-danger" name="subtotal" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="discount" class="form-label">Discount (BDT):</label>
                <vee-field
                  type="number"
                  name="discount"
                  v-model="orderFormData.discount"
                  class="form-control"
                  min="0"
                />
                <ErrorMessage class="text-danger" name="discount" />
              </div>
              <hr />
              <div class="col-md-12">
                <label for="total" class="form-label fw-bold"
                  >GRAND TOTAL (BDT):</label
                >
                <vee-field
                  type="number"
                  name="total"
                  v-model="orderFormData.total"
                  class="form-control"
                  min="0"
                />
                <ErrorMessage class="text-danger" name="total" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">SUBMIT</button>
          </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>