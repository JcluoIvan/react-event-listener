export default function EventListener(Component) {
    return class extends Component {
        constructor (props) {
            super(props);
            this._eventlisteners = { 
                stores: [ ]
            }
        }
        componentWillUnmount () {
            let { stores } = this._eventlisteners;
            stores.forEach(({store, callbacks}, i) => {
                callbacks.forEach(({event_name, callback}, j) => {
                    store.removeListener(event_name, callback);
                });
            });
        }
        watch (store, event_name, callback) {
            let storeIndex = null;
            let { stores } = this._eventlisteners;

            (! event_name) && console.warn('不正確的資料', event_name);

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