'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = EventListener;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function EventListener(Component) {
    return (function (_Component) {
        _inherits(_class, _Component);

        function _class(props) {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props);
            this._eventListenerStores = [];
        }

        _createClass(_class, [{
            key: 'componentWillUnmount',
            value: (function (_componentWillUnmount) {
                function componentWillUnmount() {
                    return _componentWillUnmount.apply(this, arguments);
                }

                componentWillUnmount.toString = function () {
                    return _componentWillUnmount.toString();
                };

                return componentWillUnmount;
            })(function () {
                _get(Object.getPrototypeOf(_class.prototype), 'componentWillUnmount', this) && componentWillUnmount();
                this._eventListenerStores.forEach(function (_ref) {
                    var store = _ref.store;
                    var callbacks = _ref.callbacks;

                    callbacks.forEach(function (_ref2) {
                        var event_name = _ref2.event_name;
                        var callback = _ref2.callback;

                        store.removeListener(event_name, callback);
                    });
                });
            })
        }, {
            key: 'watch',
            value: function watch(store, event_name, callback) {
                var storeIndex = null;
                var stores = this._eventListenerStores;

                !event_name && console.error('不正確的資料', event_name);

                stores.forEach(function (o, i) {
                    if (o.store === store) {
                        storeIndex = i;
                    }
                });
                if (storeIndex === null) {
                    storeIndex = stores.length;
                    stores.push({
                        store: store,
                        callbacks: []
                    });
                }
                store.on(event_name, callback);
                stores[storeIndex].callbacks.push({
                    event_name: event_name,
                    callback: callback
                });
            }
        }]);

        return _class;
    })(Component);
}

;
module.exports = exports['default'];