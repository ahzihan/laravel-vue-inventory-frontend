<template>
  <div class="topnav">
    <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
      <div class="collapse navbar-collapse" id="topnav-menu-content">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'dashboard' }"
              class="nav-link dropdown-toggle arrow-none"
              id="topnav-dashboard"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-home-circle icon"></i>
              <span data-key="t-dashboard">Dashboard</span>
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle arrow-none"
              href="#"
              id="topnav-uielement"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-cart icon"></i>
              <span data-key="t-elements">POS</span>
            </a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle arrow-none"
              href="#"
              id="topnav-pages"
              role="button"
            >
              <i class="bx bx-customize icon"></i>
              <span data-key="t-apps">Inventory</span>
              <div class="arrow-down"></div>
            </a>
            <div class="dropdown-menu" aria-labelledby="topnav-pages">
              <div class="dropdown">
                <a
                  class="dropdown-item dropdown-toggle arrow-none"
                  href="#"
                  id="topnav-category"
                  role="button"
                >
                  <span data-key="t-category">Category Management</span>
                  <div class="arrow-down"></div>
                </a>
                <div class="dropdown-menu" aria-labelledby="topnav-category">
                  <router-link
                    :to="{ name: 'category-index' }"
                    class="dropdown-item"
                    data-key="t-p-list"
                    >Category List</router-link
                  >
                  <router-link
                    :to="{ name: 'category-create' }"
                    class="dropdown-item"
                    data-key="t-create-new"
                    >Create New</router-link
                  >
                </div>
              </div>

              <div class="dropdown">
                <a
                  class="dropdown-item dropdown-toggle arrow-none"
                  href="#"
                  id="topnav-brand"
                  role="button"
                >
                  <span data-key="t-brand">Brand Management</span>
                  <div class="arrow-down"></div>
                </a>
                <div class="dropdown-menu" aria-labelledby="topnav-brand">
                  <router-link
                    :to="{ name: 'brand-index' }"
                    class="dropdown-item"
                    data-key="t-p-list"
                    >Brand List</router-link
                  >
                  <router-link
                    :to="{ name: 'brand-create' }"
                    class="dropdown-item"
                    data-key="t-create-new"
                    >Create New</router-link
                  >
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle arrow-none"
              href="#"
              id="topnav-components"
              role="button"
            >
              <i class="bx bx-layer icon"></i>
              <span data-key="t-components">HRM</span>
              <div class="arrow-down"></div>
            </a>
            <div class="dropdown-menu" aria-labelledby="topnav-components">
              <div class="dropdown">
                <a
                  class="dropdown-item dropdown-toggle arrow-none"
                  href="#"
                  id="topnav-map"
                  role="button"
                >
                  <span data-key="t-maps">Employee</span>
                  <div class="arrow-down"></div>
                </a>
                <div class="dropdown-menu" aria-labelledby="topnav-map">
                  <a href="#" class="dropdown-item" data-key="t-google"
                    >Employee List</a
                  >
                  <a href="#" class="dropdown-item" data-key="t-vector"
                    >Create New</a
                  >
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle arrow-none"
              href="#"
              id="topnav-more"
              role="button"
            >
              <i class="bx bx-file icon"></i>
              <span data-key="t-pages">CRM</span>
              <div class="arrow-down"></div>
            </a>
            <div class="dropdown-menu" aria-labelledby="topnav-more">
              <div class="dropdown">
                <a
                  class="dropdown-item dropdown-toggle arrow-none"
                  href="#"
                  id="topnav-supplier"
                  role="button"
                >
                  <span data-key="t-supplier">Supplier Management</span>
                  <div class="arrow-down"></div>
                </a>
                <div class="dropdown-menu" aria-labelledby="topnav-supplier">
                  <router-link
                    :to="{ name: 'supplier-index' }"
                    class="dropdown-item"
                    data-key="t-p-list"
                    >Supplier List</router-link
                  >
                  <router-link
                    :to="{ name: 'supplier-create' }"
                    class="dropdown-item"
                    data-key="t-create-new"
                    >Create New</router-link
                  >
                </div>
              </div>

              <div class="dropdown">
                <a
                  class="dropdown-item dropdown-toggle arrow-none"
                  href="#"
                  id="topnav-customer"
                  role="button"
                >
                  <span data-key="t-customer">Customer Management</span>
                  <div class="arrow-down"></div>
                </a>
                <div class="dropdown-menu" aria-labelledby="topnav-customer">
                  <router-link
                    :to="{ name: 'customer-index' }"
                    class="dropdown-item"
                    data-key="t-p-list"
                    >Customer List</router-link
                  >
                  <router-link
                    :to="{ name: 'customer-create' }"
                    class="dropdown-item"
                    data-key="t-create-new"
                    >Create New</router-link
                  >
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
