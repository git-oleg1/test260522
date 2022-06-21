export default {
  data() {
    return {
      items: [],
      loadingItems: false,
    }
  },
  computed: {
    isLoadingItems() {
      return this.loadingItems
    },
  },
  methods: {
    async loadItemsApi() {
      throw new Error('You must define method loadItemsApi')
    },
    loadItems() {
      console.log('API: Start load items')
      this.loadingItems = true
      this.loadItemsApi()
        .then(data => {
          this.items = data.items
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.loadingItems = false
          console.log('API: End load items')
        })
    },
  },
}
