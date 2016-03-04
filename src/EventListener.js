export default function EventListener(Component) {
    return class extends Component {
        constructor (props) {
            super(props);
            this._eventListenerStores = [];
        }
        componentWillUnmount () {
            super.componentWillUnmount();
            this._eventListenerStores.forEach(({store, callbacks}) => {
                callbacks.forEach(({event_name, callback}) => {
                    store.removeListener(event_name, callback);
                });
            });
        }
        watch (store, event_name, callback) {
            let storeIndex = null;
            let stores = this._eventListenerStores;

            (! event_name) && console.error('不正確的資料', event_name);

            stores.forEach((o, i) => {
                if (o.store === store) {
                    storeIndex = i;
                }
            });
            if (storeIndex === null) {
                storeIndex = stores.length;
                stores.push({
                    store,
                    callbacks: []
                });
            }
            store.on(event_name, callback);
            stores[storeIndex].callbacks.push({
                event_name,
                callback
            });
        }
    }
};