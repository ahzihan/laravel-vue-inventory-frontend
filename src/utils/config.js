export default{
    appName: "InventoryApp",
    appVersion: "1.0.0",
    defaultDataLimit: 10,
    inventoryAPIHost: import.meta.env.VITR_API_URL,
    apiToken: localStorage.getItem('token'),
    requestTimeOut: 8000
}