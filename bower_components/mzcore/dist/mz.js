/// <reference path="TSD/JQuery.d.ts" />
/// <reference path="TSD/Promise.d.ts" />
if (typeof this.jQuery === "undefined") {
    throw new Error("jQuery not present");
}
function isDef(b) {
    return typeof b != "undefined";
}
;
if (!('Promise' in window)) {
    /*! promise-polyfill 2.1.0 */
    eval("!function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if(\"object\"!=typeof this)throw new TypeError(\"Promises must be constructed via new\");if(\"function\"!=typeof a)throw new TypeError(\"not a function\");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void j(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError(\"A promise cannot be resolved with itself.\");if(a&&(\"object\"==typeof a||\"function\"==typeof a)){var c=a.then;if(\"function\"==typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled=\"function\"==typeof a?a:null,this.onRejected=\"function\"==typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=\"function\"==typeof setImmediate&&setImmediate||function(a){setTimeout(a,1)},k=Array.isArray||function(a){return\"[object Array]\"===Object.prototype.toString.call(a)};c.prototype[\"catch\"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&k(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&(\"object\"==typeof g||\"function\"==typeof g)){var h=g.then;if(\"function\"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&\"object\"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){j=a},\"undefined\"!=typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)}(this);");
}
var mz;
(function (mz) {
    mz.globalContext = window || typeof global != "undefined" && global;
    (function () {
        var UID = 1;
        mz.globalContext.Symbol = mz.globalContext.Symbol || function (a) {
            return "[[" + a + "-" + UID++ + "]]";
        };
    })();
    mz._debug = window._debug || window.location.search.match('(\\?|&)mz-debug') !== null;
    var scripts = document.getElementsByTagName('script'), test, mzcorePath, i, ln, scriptSrc, match, lang;
    var jquery = true;
    var jqueryVer = null;
    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;
        match = scriptSrc.match(/mz(\.min){0,1}\.js/);
        if (match) {
            if (scriptSrc.match('(\\?|&)no-jquery') !== null) {
                jquery = false;
            }
            mzcorePath = scriptSrc.substring(0, scriptSrc.indexOf(match[0]));
            break;
        }
    }
    mz.scriptBase = '';
    // Path helpers
    mz.core_path = (mzcorePath || '').toString();
    (mz.core_path.substr(-1) !== '/') && (mz.core_path += '/');
    function alias(clave, ruta) {
        (ruta.substr(-1) !== '/') && (ruta += '/');
        alias_routes[clave] = ruta;
    }
    mz.alias = alias;
    ;
    var alias_routes = {
        mz: mz.core_path
    };
    function getPath(path, root) {
        var io = 0, clave = null, base = root || mz.dom.adapter.getBaseHref() || mz.core_path;
        (base.substr(-1) !== '/') && (base += '/');
        if (path) {
            if (path.substr(0, 1) == '@' && (io = path.indexOf('/')) != -1 && (clave = path.substr(1, io - 1)) && alias_routes.hasOwnProperty(clave)) {
                path = path.replace('@' + clave + '/', alias_routes[clave]);
            }
            return path.substr(0, 2) in { './': 1, '~/': 1 } ? base + path.substr(2) : path;
        }
        return base;
    }
    mz.getPath = getPath;
    ;
    // element helpers
    function getElementPosition(element) {
        var elm = element;
        if (element instanceof jQuery)
            elm = element[0];
        var x = 0;
        var y = 0;
        if (elm) {
            x = elm.offsetLeft; // set x to elm’s offsetLeft
            y = elm.offsetTop; // set y to elm’s offsetTop
            elm = elm.offsetParent; // set elm to its offsetParent
            //use while loop to check if elm is null
            // if not then add current elm’s offsetLeft to x
            //offsetTop to y and set elm to its offsetParent
            while (elm != null) {
                x = (x | 0) + elm.offsetLeft | 0;
                y = (y | 0) + elm.offsetTop | 0;
                elm = elm.offsetParent;
            }
        }
        return {
            x: x,
            y: y
        };
    }
    mz.getElementPosition = getElementPosition;
    ;
    mz.emptyFn = function () { };
    mz.oldCopy = function (b, c) {
        b = b || {};
        c = c || {};
        function extend(a, b) {
            for (var i in b) {
                a[i] = b[i];
            }
            return a;
        }
        b = extend(b, c);
        if (c.hasOwnProperty && c.hasOwnProperty('toString') && (typeof c.toString != 'undefined') && (b.toString !== c.toString))
            b.toString = c.toString;
        return b;
    };
    function copy(Destination) {
        var dest = arguments[0] || {};
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                dest = mz.oldCopy(dest, arguments[i]);
            }
            return dest;
        }
        if (arguments.length == 1) {
            return mz.oldCopy({}, arguments[0]);
        }
        return dest;
    }
    mz.copy = copy;
    ;
    function mapXInto(propiedades, destino) {
        var n_args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            n_args[_i - 2] = arguments[_i];
        }
        if (arguments.length) {
            for (var i = 1; i < arguments.length; i++) {
                for (var prop in propiedades) {
                    if (arguments[i] && (propiedades[prop] in arguments[i]))
                        destino[propiedades[prop]] = arguments[i][propiedades[prop]];
                }
            }
        }
        return destino;
    }
    mz.mapXInto = mapXInto;
    ;
    function mapInto(destino) {
        var n_args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            n_args[_i - 1] = arguments[_i];
        }
        var argumentos = Array.prototype.slice.call(arguments);
        argumentos.unshift(Object.keys(destino));
        return mapXInto.apply(null, argumentos);
    }
    mz.mapInto = mapInto;
    ;
    function isIterable(a) {
        if (!a || (typeof a != 'object'))
            return false;
        if ('toString' in a && a.toString() == "[object Object]")
            return true;
        if (!('length' in a))
            return false;
        if (a instanceof Array || ('callee' in a) || ('push' in a && 'pop' in a))
            return true;
        return false;
    }
    mz.isIterable = isIterable;
    function trim(text) {
        try {
            return String(text.toString()).trim();
        }
        catch (ignored) {
            return "";
        }
    }
    mz.trim = trim;
    var contador_doms = 0;
    function getDOMID() {
        return "mz-elem-" + (contador_doms++);
    }
    mz.getDOMID = getDOMID;
    function genUID() {
        return (contador_doms++);
    }
    mz.genUID = genUID;
    mz.intval = mz.globalContext.intval = function (mixed_var, base) {
        var tmp;
        var type = typeof (mixed_var);
        if (type === 'boolean') {
            return +mixed_var;
        }
        else if (type === 'string') {
            tmp = parseInt(mixed_var, base || 10);
            return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
        }
        else if (type === 'number' && isFinite(mixed_var)) {
            return mixed_var | 0;
        }
        else {
            return 0;
        }
    };
    //console.log('MZCORE: /--==<{[One Script To Rule Them All ಠ_ಠ]}>==--/');
    mz.CBool = mz.globalContext.CBool = function (val) {
        if (!val || val == null || val == undefined)
            return false;
        if (typeof val == 'string') {
            if (val.toLowerCase() == "false")
                return false;
            if (val.toLowerCase() == "0")
                return false;
            if (val.trim().length)
                return true;
        }
        if (mz.intval(val) != 0)
            return true;
        return false;
    };
    var theQueryString = {};
    window.location && window.location.search.toString().replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
        theQueryString[$1] = $3;
        return $0;
    });
    /**
    Obtiene el valor de la clave del query string

    @method queryString
    @param {String} key
    */
    mz.queryString = function (key) {
        if (key in theQueryString)
            return theQueryString[key];
        return null;
    };
    /**
    Devuelve un valor booleano en base a la expresion. Si __expr__ es una función, la llama.

    @method readBool
    @param {Expression} expr
    */
    mz.readBool = function (cosa, datos, datos2) {
        if (typeof cosa == 'function')
            return !!cosa(datos, datos2);
        return !!cosa;
    };
    /**
    Devuelve un valor tipo string en base a la expresion. Si __expr__ es una función, la llama.

    @method readString
    @param {Expression} expr
    */
    mz.readString = function (cosa, datos, datos2) {
        if (typeof cosa == 'function') {
            var a = cosa(datos, datos2);
            if (a != null)
                return '' + a;
            return '';
        }
        return '' + isDef(cosa) && cosa !== null ? cosa : '';
    };
    /**
    Devuelve un valor en base a la expresion. Si __expr__ es una función, la llama.

    @method readVar
    @param {Expression} expr
    */
    mz.readVar = function (cosa, datos, datos2) {
        if (typeof cosa == 'function')
            return cosa(datos, datos2);
        return cosa;
    };
    /**
    Crea un delayer para la función

    @method delayer
    @param {Function} callback
    @param {Int} defTimeout
    @return {Function} FunctionDelayer
    */
    mz.delayer = function (fn, defTimeout, thisp) {
        var timer = null;
        defTimeout = defTimeout || 16;
        var ret = function () {
            timer && clearTimeout(timer);
            var a = arguments;
            thisp = thisp || this;
            timer = setTimeout(function () {
                fn.apply(thisp || null, a);
                timer = null;
            }, defTimeout);
            return timer;
        };
        ret.now = function () {
            timer && clearTimeout(timer);
            timer = null;
            return fn.apply(thisp || null, arguments);
        };
        ret.cancel = function () {
            timer && clearTimeout(timer);
            timer = null;
        };
        return ret;
    };
    /**
    Debounces the current call until the next frame

    @method delayer
    @param {Function} fn
    @return {Function} FunctionDelayer
    */
    mz.screenDelayer = function (fn, thisp) {
        var timer = null;
        var ret = function () {
            timer && cancelAnimationFrame(timer);
            var a = arguments;
            thisp = thisp || this;
            timer = requestAnimationFrame(function () {
                fn.apply(thisp || null, a);
                timer = null;
            });
            return timer;
        };
        ret.now = function () {
            timer && cancelAnimationFrame(timer);
            timer = null;
            return fn.apply(thisp || null, arguments);
        };
        ret.cancel = function () {
            timer && cancelAnimationFrame(timer);
            timer = null;
        };
        return ret;
    };
    mz.traspose = function (a) {
        return Object.keys(a[0]).map(function (c) {
            return a.map(function (r) {
                return r[c];
            });
        });
    };
    /**
    Obtiene el valor del Performance Counter

    @method now
    @return {Number} PerformanceCounter
    */
    mz.now = 'performance' in window && window.performance.now ?
        function () {
            return window.performance.now();
        } :
        function () {
            return (new Date()).getTime();
        };
    mz.blankImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    mz.transformTag = null;
    var data;
    (function (data) {
        var order;
        (function (order) {
            function null_arriba(a, b, campo) {
                var aTieneNulo = !(campo in a) || a[campo] == null;
                var bTieneNulo = !(campo in b) || b[campo] == null;
                if (aTieneNulo != bTieneNulo) {
                    if (bTieneNulo)
                        return -1;
                    return 1;
                }
                if (aTieneNulo == true || a[campo] == b[campo])
                    return 0;
                return +(a[campo] > b[campo]) * 2 - 1;
            }
            order.null_arriba = null_arriba;
            function null_abajo(a, b, campo) {
                var aTieneNulo = !(campo in a) || a[campo] == null;
                var bTieneNulo = !(campo in b) || b[campo] == null;
                if (aTieneNulo != bTieneNulo) {
                    if (bTieneNulo)
                        return 1;
                    return -1;
                }
                if (aTieneNulo == true || a[campo] == b[campo])
                    return 0;
                return +(a[campo] > b[campo]) * 2 - 1;
            }
            order.null_abajo = null_abajo;
            function build(elems) {
                if (typeof elems == 'function')
                    return elems;
                var null_abajo = this.null_abajo, null_arriba = this.null_arriba;
                if (typeof elems == 'string') {
                    elems = elems.split(',');
                    for (var i in elems) {
                        elems[i] = mz.trim(elems[i]);
                        var t = elems[i].toUpperCase();
                        if (/(( ASC)|( DESC))$/.test(t)) {
                            elems[i] = {
                                invertir: /( DESC)$/.test(t),
                                campo: elems[i].replace(/( ASC)$|( DESC)$/, '')
                            };
                        }
                    }
                }
                return function (a, b) {
                    var tmp = 0;
                    for (var i in elems) {
                        if (typeof elems[i] == "string") {
                            tmp = null_abajo(a, b, elems[i]);
                        }
                        else {
                            if (elems[i].null_abajo) {
                                tmp = null_abajo(a, b, elems[i].campo);
                            }
                            else {
                                tmp = null_arriba(a, b, elems[i].campo);
                            }
                            if (elems[i].invertir)
                                tmp *= -1;
                        }
                        if (tmp != 0)
                            return tmp;
                    }
                    return tmp;
                };
            }
            order.build = build;
        })(order = data.order || (data.order = {}));
    })(data = mz.data || (mz.data = {}));
    mz.hardCodedFiles = {};
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    mz.escapeRegExp = escapeRegExp;
    var cssCargados = {};
    function loadCss(url) {
        url = getPath(url);
        var absoluteUrl = mz.xr.getAbsoluteUrl(url);
        if (url in cssCargados)
            return cssCargados[url];
        if (absoluteUrl in cssCargados)
            return cssCargados[absoluteUrl];
        var estilos = document.getElementsByTagName('link'), i, ln;
        for (i = 0, ln = estilos.length; i < ln; i++) {
            if (estilos[i].rel == 'stylesheet' && (estilos[i].href.split('?')[0] == url || estilos[i].href.split('?')[0] == absoluteUrl))
                return estilos[i];
        }
        if ('createStyleSheet' in document) {
            return cssCargados[url] = document.createStyleSheet(url);
        }
        else {
            var style = $("<link rel='stylesheet' type='text/css' />");
            style.attr('href', url);
            //$(function () {
            style.appendTo($("head"));
            //});
            cssCargados[url] = style;
            return style[0];
        }
    }
    mz.loadCss = loadCss;
    function fnInfo(fn) {
        var fnRegex = /^function[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/;
        var matches = fn.toString().match(fnRegex);
        return {
            params: matches[1].split(","),
            body: matches[2]
        };
    }
    mz.fnInfo = fnInfo;
    function compileFilter(filter) {
        var filterInfo = fnInfo(filter);
        var filterBody = filterInfo.body
            .replace(/return false[;}]/gi, "{ continue _coreloop; }")
            .replace(/return true[;}]/gi, "{ _retval.push($item$); continue _coreloop; }")
            .replace(/return ([^;}]+?)/gi, "{ if ($1) { _retval.push($item$) }; continue _coreloop; }");
        var tpl = [
            //"function(_items, _args) { ",
            "var _retval = new Array(), _idx = 0; ",
            "var $item$, $args$ = _args; ",
            "_coreloop: ",
            "for (var _i = 0, _il = _items.length; _i < _il; _i++) { ",
            "$item$ = _items[_i]; ",
            "$filter$; ",
            "} ",
            "return _retval; "
        ].join("");
        tpl = tpl.replace(/\$filter\$/gi, filterBody);
        tpl = tpl.replace(/\$item\$/gi, filterInfo.params[0]);
        tpl = tpl.replace(/\$args\$/gi, filterInfo.params[1]);
        var fn = new Function("_items,_args", tpl);
        fn.displayName = fn.name = "compiledFilter";
        return fn;
    }
    mz.compileFilter = compileFilter;
    function getWindowSize() {
        var winW = 630, winH = 460;
        if (document.body && document.body.offsetWidth) {
            winW = document.body.offsetWidth;
            winH = document.body.offsetHeight;
        }
        if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
            winW = document.documentElement.offsetWidth;
            winH = document.documentElement.offsetHeight;
        }
        if (window.innerWidth && window.innerHeight) {
            winW = window.innerWidth;
            winH = window.innerHeight;
        }
        return {
            width: winW,
            height: winH
        };
    }
    mz.getWindowSize = getWindowSize;
    ;
    var uid = 0;
    function globalCallback(cb) {
        uid++;
        mz["__" + uid] = cb;
        return "mz.__" + uid;
    }
    mz.globalCallback = globalCallback;
    function buscarArgumentoTipo(tipo, argu) {
        var args = argu || arguments.callee.caller.arguments;
        if (typeof tipo == 'string') {
            for (var i in args) {
                if (typeof args[i] == tipo) {
                    return args[i];
                }
            }
        }
        else if (typeof tipo == 'function') {
            for (var i in args) {
                if (args[i] instanceof tipo) {
                    return args[i];
                }
            }
        }
    }
    mz.buscarArgumentoTipo = buscarArgumentoTipo;
})(mz || (mz = {}));
var mz;
(function (mz) {
    var view;
    (function (view) {
        // riot!.js
        var brackets = (function (orig) {
            var cachedBrackets, r, b, re = /[{}]/g;
            return function (x) {
                // make sure we use the current setting
                var s = orig;
                // recreate cached vars if needed
                if (cachedBrackets !== s) {
                    cachedBrackets = s;
                    b = s.split(' ');
                    r = b.map(function (e) { return e.replace(/(?=.)/g, '\\'); });
                }
                // if regexp given, rewrite it with current brackets (only if differ from default)
                return x instanceof RegExp ? (s === orig ? x :
                    new RegExp(x.source.replace(re, function (b) { return r[~~(b === '}')]; }), x.global ? 'g' : '')) :
                    // else, get specific bracket
                    b[x];
            };
        })('{ }');
        var cache = {}, reVars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi;
        //           [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
        // find variable names:
        // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
        // 2. skip object properties: .name
        // 3. skip object literals: name:
        // 4. skip javascript keywords
        // 5. match var name
        // build a template (or get it from cache), render with data
        function tmpl(str, context, scope) {
            return str && (cache[str] = cache[str] || tmpl.internalTmpl(str)).call(context, scope);
        }
        view.tmpl = tmpl;
        var tmpl;
        (function (tmpl) {
            tmpl.debug = false;
            // create a template instance
            function internalTmpl(s, p) {
                if (tmpl.debug) {
                    console.groupCollapsed(s);
                }
                var orig = s;
                // default template string to {}
                s = (s || (brackets(0) + brackets(1)))
                    .replace(brackets(/\\{/g), '\uFFF0')
                    .replace(brackets(/\\}/g), '\uFFF1');
                // split string to expression and non-expresion parts
                p = split(s, extract(s, brackets(/{/), brackets(/}/)));
                var body = (
                // is it a single expression or a template? i.e. {x} or <b>{x}</b>
                !p[0] && !p[2] && !p[3]
                    ? expr(p[1])
                    : '[' + p.map(function (s, i) {
                        // is it an expression or a string (every second part is an expression)
                        return i % 2
                            ? expr(s, true)
                            : '"' + s
                                .replace(/\r\n/g, '\\n')
                                .replace(/\r/g, '\\n')
                                .replace(/\n/g, '\\n')
                                .replace(/"/g, '\\"')
                                + '"';
                    }).join(',') + '].join("")')
                    .replace(/\uFFF0/g, brackets(0))
                    .replace(/\uFFF1/g, brackets(1));
                if (body.trim().length == 0)
                    body = 'void 0';
                if (tmpl.debug) {
                    console.log(body);
                    console.groupEnd();
                }
                var a = new Function('scope', 'return (' + body + ')');
                a.mzt = orig;
                return a;
            }
            tmpl.internalTmpl = internalTmpl;
            // parse { ... } expression
            function expr(s, n) {
                if (tmpl.debug)
                    console.log('expr:', s);
                s = s
                    .replace(/\n/g, ' ')
                    .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '');
                // is it an object literal? i.e. { key : value }
                return /^\s*[\w-#\. "']+ *:/.test(s)
                    ? '[' +
                        // extract key:val pairs, ignoring any nested objects
                        extract(s, 
                        // name part: name:, "name":, 'name':, name :
                        /["' ]*[\w-#\. ]+["' ]*:/, 
                        // expression part: everything upto a comma followed by a name (see above) or end of line
                        /,(?=["' ]*[\w-#\. ]+["' ]*:)|}|$/).map(function (pair) {
                            // get key, val parts
                            return pair.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function (_, k, v) {
                                // wrap all conditional parts to ignore errors
                                return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k + '":"",';
                            });
                        }).join('')
                        + '].join(" ").trim()'
                    : wrap(s, n);
            }
            tmpl.expr = expr;
            ;
            // execute js w/o breaking on errors or undefined vars
            function wrap(s, nonull) {
                s = s.trim();
                return !s ? '' : "\n                (function(){ \n                    var v; \n                    try { \n                        v = "
                    + (s.replace(reVars, function (s, _, v) {
                        return v ?
                            "\n                            (typeof " + v + " === \"undefined\" ? typeof this." + v + " === \"undefined\" ? this.get && this.get(\"" + v + "\") : this." + v + " : " + v + ")"
                            :
                                s;
                    }) || '[][0]')
                    + ("\n                    } catch(e) { }\n                    return " + (nonull === true ? ' !v && v !== 0 ? "" : v' : 'v') + ";\n                }).call(this)");
            }
            tmpl.wrap = wrap;
            // split string by an array of substrings
            function split(str, substrings) {
                var parts = [];
                substrings.map(function (sub, i) {
                    // push matched expression and part before it
                    i = str.indexOf(sub);
                    parts.push(str.slice(0, i), sub);
                    str = str.slice(i + sub.length);
                });
                // push the remaining part
                return parts.concat(str);
            }
            tmpl.split = split;
            // match strings between opening and closing regexp, skipping any inner/nested matches
            function extract(str, open, close) {
                var start, level = 0, matches = [], re = new RegExp('(' + open.source + ')|(' + close.source + ')', 'g');
                str.replace(re, function (_, open, close, pos) {
                    // if outer inner bracket, mark position
                    if (!level && open)
                        start = pos;
                    // in(de)crease bracket level
                    level += open ? 1 : -1;
                    // if outer closing bracket, grab the match
                    if (!level && close != null)
                        matches.push(str.slice(start, pos + close.length));
                });
                return matches;
            }
            tmpl.extract = extract;
        })(tmpl = view.tmpl || (view.tmpl = {}));
    })(view = mz.view || (mz.view = {}));
})(mz || (mz = {}));
var mz;
(function (mz) {
    mz.HIDDEN_PROP = (function getHiddenProp() {
        var prefixes = ['webkit', 'moz', 'ms', 'o', 'Webkit'];
        if (typeof document == "undefined")
            return null;
        // if 'hidden' is natively supported just return it
        if ('hidden' in document)
            return 'hidden';
        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
                return prefixes[i] + 'Hidden';
        }
        // otherwise it's not supported
        return null;
    })();
    mz.hiddenProp = mz.HIDDEN_PROP;
    var tmp;
    if (typeof document != "undefined")
        tmp = document.createElement("div");
    mz.TRANSFORM_STYLE = (function getTransformTag() {
        var prefixes = ['webkit', 'moz', 'ms', 'o', 'Webkit'];
        if (!tmp)
            return null;
        if ('transform' in tmp.style)
            return 'transform';
        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Transform') in tmp.style)
                return prefixes[i] + 'Transform';
        }
        return null;
    })();
    mz.TRANSFORM_CSS = (function getTransformTag() {
        var prefixes = ['webkit', 'moz', 'ms', 'o', 'Webkit'];
        if (!tmp)
            return null;
        if ('transform' in tmp.style)
            return 'transform';
        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Transform') in tmp.style)
                return '-' + prefixes[i] + '-transform';
        }
        return null;
    })();
})(mz || (mz = {}));
var mz;
(function (mz) {
    var eventSplitter = /\s+/g;
    var EventDispatcherBinding = (function () {
        function EventDispatcherBinding() {
            this.enabled = true;
        }
        EventDispatcherBinding.prototype.off = function () {
            if (this.object) {
                this.cb && this.object.off(this);
                this.cb = null;
                this.object = null;
                if (this.sharedList)
                    delete this.sharedList;
            }
        };
        EventDispatcherBinding.prototype.enable = function () {
            if (this.sharedList) {
                for (var i = 0; i < this.sharedList.length; i++)
                    this.sharedList[i].enabled = true;
            }
            else
                this.enabled = true;
        };
        EventDispatcherBinding.prototype.disable = function () {
            if (this.sharedList) {
                for (var i = 0; i < this.sharedList.length; i++)
                    this.sharedList[i].enabled = false;
            }
            else
                this.enabled = false;
        };
        return EventDispatcherBinding;
    })();
    mz.EventDispatcherBinding = EventDispatcherBinding;
    var turnOffCallback = function (f) {
        delete f.cb;
    };
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.ed_bindeos = {};
            this.ed_bindCount = 0;
            this.trigger = this.emit;
        }
        EventDispatcher.prototype.on = function (event, callback, once) {
            var _this = this;
            this.ed_bindCount++;
            var events = event.split(eventSplitter);
            var tmp;
            var listaBindeos = [];
            events.forEach(function (evt) {
                tmp = new EventDispatcherBinding();
                tmp.id = _this.ed_bindCount;
                tmp.cb = null;
                tmp.evento = evt;
                tmp.sharedList = listaBindeos;
                tmp.object = _this;
                listaBindeos && listaBindeos.push(tmp);
                if (once) {
                    tmp.cb = function () {
                        callback.apply(this, arguments);
                        tmp.cb = null;
                    };
                }
                else {
                    tmp.cb = callback;
                }
                tmp.cb = tmp.cb.bind(_this);
                _this.ed_bindeos[evt] = _this.ed_bindeos[evt] || [];
                _this.ed_bindeos[evt].push(tmp);
            });
            return tmp;
        };
        EventDispatcher.prototype.once = function (event, callback) {
            return this.on(event, callback, true);
        };
        EventDispatcher.prototype.off = function (bindeo, callback) {
            if (arguments.length == 0) {
                for (var i in this.ed_bindeos) {
                    for (var e in this.ed_bindeos[i])
                        delete this.ed_bindeos[i][e].cb;
                    this.ed_bindeos[i].length = 0;
                }
            }
            else if (bindeo instanceof EventDispatcherBinding) {
                bindeo.cb = null;
                bindeo.sharedList && bindeo.sharedList.length && bindeo.sharedList.forEach(turnOffCallback);
            }
            else if (typeof bindeo === 'string') {
                if (typeof callback == 'function') {
                    for (var i in this.ed_bindeos[bindeo]) {
                        if (this.ed_bindeos[bindeo][i].cb === callback) {
                            this.ed_bindeos[bindeo][i].cb = null;
                        }
                    }
                }
                else if (typeof bindeo == 'string') {
                    this.ed_bindeos[bindeo] = [];
                }
            }
            else if (typeof bindeo === 'function') {
                for (var evt in this.ed_bindeos) {
                    for (var i_1 in this.ed_bindeos[evt]) {
                        if (this.ed_bindeos[evt][i_1].cb === bindeo) {
                            this.ed_bindeos[evt][i_1].cb = null;
                        }
                    }
                }
            }
        };
        // cleanup the disposed events
        EventDispatcher.prototype.cleanupTurnedOffEvents = function () {
            for (var evt in this.ed_bindeos) {
                var list = [];
                for (var i in this.ed_bindeos[evt]) {
                    if (this.ed_bindeos[evt][i] && this.ed_bindeos[evt][i] instanceof EventDispatcherBinding && this.ed_bindeos[evt][i].cb) {
                        list.push(this.ed_bindeos[evt]);
                    }
                }
                this.ed_bindeos[evt] = list;
            }
        };
        EventDispatcher.prototype.emit = function (event) {
            if (event in this.ed_bindeos) {
                if (arguments.length == 1) {
                    for (var i = 0; i < this.ed_bindeos[event].length; i++) {
                        var e = this.ed_bindeos[event][i];
                        e && e.cb && e.enabled && e.cb();
                    }
                }
                else if (arguments.length == 2) {
                    for (var i = 0; i < this.ed_bindeos[event].length; i++) {
                        var e = this.ed_bindeos[event][i];
                        e && e.cb && e.enabled && e.cb(arguments[1]);
                    }
                }
                else if (arguments.length == 3) {
                    for (var i = 0; i < this.ed_bindeos[event].length; i++) {
                        var e = this.ed_bindeos[event][i];
                        e && e.cb && e.enabled && e.cb(arguments[1], arguments[2]);
                    }
                }
                else if (arguments.length == 4) {
                    for (var i = 0; i < this.ed_bindeos[event].length; i++) {
                        var e = this.ed_bindeos[event][i];
                        e && e.cb && e.enabled && e.cb(arguments[1], arguments[2], arguments[3]);
                    }
                }
                else if (arguments.length == 5) {
                    for (var i = 0; i < this.ed_bindeos[event].length; i++) {
                        var e = this.ed_bindeos[event][i];
                        e && e.cb && e.enabled && e.cb(arguments[1], arguments[2], arguments[3], arguments[4]);
                    }
                }
                else if (arguments.length > 4) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    for (var i = 0; i < this.ed_bindeos[event].length; i++) {
                        var e = this.ed_bindeos[event][i];
                        e && e.cb && e.enabled && e.cb.apply(this, args);
                    }
                }
            }
        };
        EventDispatcher.EVENTS = {};
        return EventDispatcher;
    })();
    mz.EventDispatcher = EventDispatcher;
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
/// <reference path="EventDispatcher.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mz;
(function (mz) {
    var MVCObject = (function (_super) {
        __extends(MVCObject, _super);
        function MVCObject(args) {
            _super.call(this);
            this.data = {};
            args && this.setValues(args);
        }
        MVCObject.prototype.getAll = function () { return mz.copy(this.data); };
        MVCObject.prototype.setValues = function (values, emit) {
            if (values instanceof MVCObject) {
                values = values.getAll();
            }
            for (var i in values) {
                this.set(i, values[i], !emit);
            }
            this.emit(MVCObject.EVENTS.setValues, this.data, values);
        };
        MVCObject.prototype.set = function (field, value, PreventPropagation) {
            if (typeof field === "undefined")
                return;
            var viejo = this.data[field];
            this.data[field] = value;
            var ch = field + '_changed';
            var result;
            if (ch in this && typeof this[ch] === 'function') {
                try {
                    result = this[ch](value, viejo);
                }
                catch (e) {
                    if (e === MVCObject.Exception_RollbackOperation) {
                        this.data[field] = viejo;
                        return;
                    }
                    if (e === MVCObject.Exception_PreventPropagation)
                        return;
                    throw e;
                }
            }
            if (typeof result !== "undefined") {
                value = this.data[field] = result;
            }
            this.emit(ch, this.data[field], viejo);
            !PreventPropagation && this.emit(MVCObject.EVENTS.valueChanged, this.data, field, this.data[field], viejo);
        };
        MVCObject.prototype.get = function (field) {
            return this.data[field];
        };
        MVCObject.prototype.touch = function (fieldName) {
            this.set(fieldName, this.get(fieldName));
        };
        MVCObject.EVENTS = mz.copy({
            /// Triggered when the method setValues is called
            setValues: "setValues",
            /// Triggered when a value is setted
            valueChanged: "valueChanged"
        }, mz.EventDispatcher.EVENTS);
        MVCObject.Exception_RollbackOperation = new Error("The change operation has been rolled back");
        MVCObject.Exception_PreventPropagation = new Error("The propagation events has been aborted");
        return MVCObject;
    })(mz.EventDispatcher);
    mz.MVCObject = MVCObject;
})(mz || (mz = {}));
var mz;
(function (mz) {
    var MVCObject;
    (function (MVCObject) {
        function proxy(target, propertyKey) {
            if (delete target[propertyKey]) {
                Object.defineProperty(target, propertyKey.toString(), {
                    get: function () {
                        return this.data[propertyKey];
                    },
                    set: function (value) {
                        this.set(propertyKey, value);
                    },
                    enumerable: true
                });
            }
        }
        MVCObject.proxy = proxy;
    })(MVCObject = mz.MVCObject || (mz.MVCObject = {}));
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
var mz;
(function (mz) {
    var core;
    (function (core) {
        var decorators;
        (function (decorators) {
            function LogResult(target, key, value) {
                return {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        var a = args.map(function (a) { return JSON.stringify(a); }).join();
                        var result = value.value.apply(this, args);
                        var r = JSON.stringify(result);
                        console.log("LogResult: " + key + "(" + a + ") => " + r);
                        return result;
                    }
                };
            }
            decorators.LogResult = LogResult;
            function noEnumerable(target, propertyKey, descriptor) {
                descriptor.enumerable = false;
                return descriptor;
            }
            decorators.noEnumerable = noEnumerable;
            var delayerCount = 0;
            function delayer(timeout) {
                return function (target, propertyKey, descriptor) {
                    var originalValue = descriptor.value;
                    var delayerID = Symbol("[[delayer-" + delayerCount++ + "]]");
                    descriptor.value = function () {
                        var theDelayer = this[delayerID] = this[delayerID] || mz.delayer(originalValue, timeout, this);
                        return theDelayer.apply(this, arguments);
                    };
                    return descriptor;
                };
            }
            decorators.delayer = delayer;
            function screenDelayer(target, propertyKey, descriptor) {
                var originalValue = descriptor.value;
                var delayerID = Symbol("[[delayer-" + delayerCount++ + "]]");
                descriptor.value = function () {
                    var theDelayer = this[delayerID] = this[delayerID] || mz.screenDelayer(originalValue, this);
                    return theDelayer.apply(this, arguments);
                };
                return descriptor;
            }
            decorators.screenDelayer = screenDelayer;
        })(decorators = core.decorators || (core.decorators = {}));
    })(core = mz.core || (mz.core = {}));
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
/// <reference path="../VIEW/Tmpl.ts" />
/// <reference path="../VIEW/Helpers.ts" />
/// <reference path="../CORE/MVCObject.ts" />
/// <reference path="Widget.ts" />
var mz;
(function (mz) {
    var widgets;
    (function (widgets) {
        var TextNode = (function () {
            function TextNode(value, component, scope) {
                this.value = value;
                this.component = component;
                this.scope = scope;
                this.listening = [];
                var t = mz.view.tmpl(value, component, scope);
                if (typeof t === "undefined")
                    t = '';
                this.rootNode = mz.dom.adapter.createTextNode(t);
                this.rootNode.$tmpl = value;
                this.rootNode.$component = component;
                this.rootNode.$scope = scope;
                this.rootNode.$widget = this;
            }
            TextNode.prototype.setup = function (value, component, scope) {
                this.value = value;
                this.component = component;
                this.scope = scope;
                var t = mz.view.tmpl(value, component, scope);
                if (typeof t === "undefined" || t === null)
                    t = '';
                //this.rootNode.textContent = t;
                mz.dom.microqueue.setText(this.rootNode, t);
                this.rootNode.$tmpl = value;
                this.rootNode.$component = component;
                this.rootNode.$scope = scope;
                this.rootNode.$widget = this;
            };
            TextNode.prototype.unmount = function () {
                this.rootNode.remove();
                this.rootNode.$tmpl = null;
                this.rootNode.$component = null;
                this.rootNode.$scope = null;
                this.rootNode.$widget = null;
                for (var _i = 0, _a = this.listening; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i && i.off && i.off();
                }
                this.listening.length = 0;
                this.value = this.component = this.scope = null;
                TextNode.returnToPoll(this);
            };
            TextNode.prototype.refreshScope = function () {
                var t = mz.view.tmpl(this.value, this.component, this.scope);
                if (typeof t === "undefined" || t === null)
                    t = '';
                mz.dom.microqueue.setText(this.rootNode, t);
                //if (this.rootNode.textContent != t) {
                //    this.rootNode.textContent = t;
                //}
            };
            TextNode.returnToPoll = function (val) {
                if (val)
                    this.pollObjects.push(val);
            };
            TextNode.getFromPoll = function (value, component, scope) {
                var elem = null;
                if (this.pollObjects.length) {
                    elem = this.pollObjects.pop();
                    elem.setup(value, component, scope);
                    return elem;
                }
                else {
                    return new TextNode(value, component, scope);
                }
            };
            TextNode.pollObjects = [];
            return TextNode;
        })();
        widgets.TextNode = TextNode;
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));
var mz;
(function (mz) {
    var dom;
    (function (dom) {
        function setRootDomAdapter(theAdapter) {
            if (!dom.adapter) {
                mz.scriptBase = theAdapter.getBaseHref() || '';
                dom.adapter = theAdapter;
            }
        }
        dom.setRootDomAdapter = setRootDomAdapter;
    })(dom = mz.dom || (mz.dom = {}));
})(mz || (mz = {}));
/// <reference path="../../mz.ts" />
/// <reference path="../DOM.ts" />
var mz;
(function (mz) {
    var dom;
    (function (dom) {
        /* tslint:disable:requireParameterType */
        /**
         * Provides DOM operations in an environment-agnostic way.
         */
        var AbstractDomAdapter = (function () {
            function AbstractDomAdapter() {
            }
            return AbstractDomAdapter;
        })();
        dom.AbstractDomAdapter = AbstractDomAdapter;
    })(dom = mz.dom || (mz.dom = {}));
})(mz || (mz = {}));
/// <reference path="DOM.ts" />
var mz;
(function (mz) {
    var dom;
    (function (dom) {
        var _attrToPropMap = {
            'class': 'className',
            'innerHtml': 'innerHTML',
            'readonly': 'readOnly',
            'tabindex': 'tabIndex'
        };
        var DOM_KEY_LOCATION_NUMPAD = 3;
        // Map to convert some key or keyIdentifier values to what will be returned by getEventKey
        var _keyMap = {
            // The following values are here for cross-browser compatibility and to match the W3C standard
            // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
            '\b': 'Backspace',
            '\t': 'Tab',
            '\x7F': 'Delete',
            '\x1B': 'Escape',
            'Del': 'Delete',
            'Esc': 'Escape',
            'Left': 'ArrowLeft',
            'Right': 'ArrowRight',
            'Up': 'ArrowUp',
            'Down': 'ArrowDown',
            'Menu': 'ContextMenu',
            'Scroll': 'ScrollLock',
            'Win': 'OS'
        };
        // There is a bug in Chrome for numeric keypad keys:
        // https://code.google.com/p/chromium/issues/detail?id=155654
        // 1, 2, 3 ... are reported as A, B, C ...
        var _chromeNumKeyPadMap = {
            'A': '1',
            'B': '2',
            'C': '3',
            'D': '4',
            'E': '5',
            'F': '6',
            'G': '7',
            'H': '8',
            'I': '9',
            'J': '*',
            'K': '+',
            'M': '-',
            'N': '.',
            'O': '/',
            '\x60': '0',
            '\x90': 'NumLock'
        };
        /**
         * Provides DOM operations in any browser environment.
         */
        var GenericBrowserDomAdapter = (function (_super) {
            __extends(GenericBrowserDomAdapter, _super);
            function GenericBrowserDomAdapter() {
                _super.call(this);
                this._animationPrefix = null;
                this._transitionEnd = null;
                try {
                    var element = this.createElement('div', this.defaultDoc());
                    if ((this.getStyle(element, 'animationName'))) {
                        this._animationPrefix = '';
                    }
                    else {
                        var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                        for (var i = 0; i < domPrefixes.length; i++) {
                            if ((this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                                this._animationPrefix = '-' + (domPrefixes[i].toLowerCase()) + '-';
                                break;
                            }
                        }
                    }
                    var transEndEventNames = {
                        WebkitTransition: 'webkitTransitionEnd',
                        MozTransition: 'transitionend',
                        OTransition: 'oTransitionEnd otransitionend',
                        transition: 'transitionend'
                    };
                    for (var key in transEndEventNames) {
                        if (this.getStyle(element, key)) {
                            this._transitionEnd = transEndEventNames[key];
                        }
                    }
                    ;
                }
                catch (e) {
                    this._animationPrefix = null;
                    this._transitionEnd = null;
                }
            }
            GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
            GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
                el.href = href == null ? baseUrl : baseUrl + '/../' + href;
            };
            GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
            GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () {
                return typeof (this.defaultDoc().body.createShadowRoot) == "function";
            };
            GenericBrowserDomAdapter.prototype.getAnimationPrefix = function () {
                return (!!this._animationPrefix) ? this._animationPrefix : "";
            };
            GenericBrowserDomAdapter.prototype.getTransitionEnd = function () { return (!!this._transitionEnd) ? this._transitionEnd : ""; };
            GenericBrowserDomAdapter.prototype.supportsAnimation = function () {
                return (!!this._animationPrefix) && (!!this._transitionEnd);
            };
            GenericBrowserDomAdapter.prototype.getXHR = function () { return new XMLHttpRequest; };
            return GenericBrowserDomAdapter;
        })(dom.AbstractDomAdapter);
        dom.GenericBrowserDomAdapter = GenericBrowserDomAdapter;
        /* tslint:disable:requireParameterType */
        var BrowserDomAdapter = (function (_super) {
            __extends(BrowserDomAdapter, _super);
            function BrowserDomAdapter() {
                _super.apply(this, arguments);
            }
            BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error("parse not implemented"); };
            BrowserDomAdapter.makeCurrent = function () { dom.setRootDomAdapter(new BrowserDomAdapter()); };
            BrowserDomAdapter.prototype.hasProperty = function (element, name) { return name in element; };
            BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
            BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
            BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
                el[methodName].apply(el, args);
            };
            // TODO(tbosch): move this into a separate environment class once we have it
            BrowserDomAdapter.prototype.logError = function (error) {
                if (console.error) {
                    console.error(error);
                }
                else {
                    console.log(error);
                }
            };
            BrowserDomAdapter.prototype.log = function (error) { console.log(error); };
            BrowserDomAdapter.prototype.logGroup = function (error) {
                if (console.group) {
                    console.group(error);
                    this.logError(error);
                }
                else {
                    console.log(error);
                }
            };
            BrowserDomAdapter.prototype.logGroupEnd = function () {
                if (console.groupEnd) {
                    console.groupEnd();
                }
            };
            Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
                get: function () { return _attrToPropMap; },
                enumerable: true,
                configurable: true
            });
            BrowserDomAdapter.prototype.query = function (selector) { return document.querySelector(selector); };
            BrowserDomAdapter.prototype.querySelector = function (el, selector) { return el.querySelector(selector); };
            BrowserDomAdapter.prototype.querySelectorAll = function (el, selector) { return el.querySelectorAll(selector); };
            BrowserDomAdapter.prototype.on = function (el, evt, listener) { el.addEventListener(evt, listener, false); };
            BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
                el.addEventListener(evt, listener, false);
                // Needed to follow Dart's subscription semantic, until fix of
                // https://code.google.com/p/dart/issues/detail?id=17406
                return function () { el.removeEventListener(evt, listener, false); };
            };
            BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) { el.dispatchEvent(evt); };
            BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
                var evt = document.createEvent('MouseEvent');
                evt.initEvent(eventType, true, true);
                return evt;
            };
            BrowserDomAdapter.prototype.createEvent = function (eventType) {
                var evt = document.createEvent('Event');
                evt.initEvent(eventType, true, true);
                return evt;
            };
            BrowserDomAdapter.prototype.preventDefault = function (evt) {
                evt.preventDefault();
                evt.returnValue = false;
            };
            BrowserDomAdapter.prototype.isPrevented = function (evt) {
                return evt.defaultPrevented || !!(evt.returnValue) && !evt.returnValue;
            };
            BrowserDomAdapter.prototype.getInnerHTML = function (el) { return el.innerHTML; };
            BrowserDomAdapter.prototype.getOuterHTML = function (el) { return el.outerHTML; };
            BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
            BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
            BrowserDomAdapter.prototype.type = function (node) { return node.type; };
            BrowserDomAdapter.prototype.content = function (node) {
                if (this.hasProperty(node, "content")) {
                    return node.content;
                }
                else {
                    return node;
                }
            };
            BrowserDomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
            BrowserDomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
            BrowserDomAdapter.prototype.parentElement = function (el) { return el.parentNode; };
            BrowserDomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
            BrowserDomAdapter.prototype.childNodesAsList = function (el) {
                var childNodes = el.childNodes;
                var res = [];
                res.length = childNodes.length;
                for (var i = 0; i < childNodes.length; i++) {
                    res[i] = childNodes[i];
                }
                return res;
            };
            BrowserDomAdapter.prototype.clearNodes = function (el) {
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            };
            BrowserDomAdapter.prototype.appendChild = function (el, node) { el.appendChild(node); };
            BrowserDomAdapter.prototype.removeChild = function (el, node) { el.removeChild(node); };
            BrowserDomAdapter.prototype.replaceChild = function (el, newChild, oldChild) { el.replaceChild(newChild, oldChild); };
            BrowserDomAdapter.prototype.remove = function (node) {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                return node;
            };
            BrowserDomAdapter.prototype.insertBefore = function (el, node) { el.parentNode.insertBefore(node, el); };
            BrowserDomAdapter.prototype.insertAllBefore = function (el, nodes) { nodes.forEach(function (n) { return el.parentNode.insertBefore(n, el); }); };
            BrowserDomAdapter.prototype.insertAfter = function (el, node) { el.parentNode.insertBefore(node, el.nextSibling); };
            BrowserDomAdapter.prototype.setInnerHTML = function (el, value) { el.innerHTML = value; };
            BrowserDomAdapter.prototype.getText = function (el) { return el.textContent; };
            // TODO(vicb): removed Element type because it does not support StyleElement
            BrowserDomAdapter.prototype.setText = function (el, value) { el.textContent = value; };
            BrowserDomAdapter.prototype.getValue = function (el) { return el.value; };
            BrowserDomAdapter.prototype.setValue = function (el, value) { el.value = value; };
            BrowserDomAdapter.prototype.getChecked = function (el) { return el.checked; };
            BrowserDomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
            BrowserDomAdapter.prototype.createComment = function (text) { return document.createComment(text); };
            BrowserDomAdapter.prototype.createTemplate = function (html) {
                var t = document.createElement('template');
                t.innerHTML = html;
                return t;
            };
            BrowserDomAdapter.prototype.createElement = function (tagName, doc) {
                if (doc === void 0) { doc = document; }
                return doc.createElement(tagName);
            };
            BrowserDomAdapter.prototype.createElementNS = function (ns, tagName, doc) {
                if (doc === void 0) { doc = document; }
                return doc.createElementNS(ns, tagName);
            };
            BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
                if (doc === void 0) { doc = document; }
                return doc.createTextNode(text);
            };
            BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
                if (doc === void 0) { doc = document; }
                var el = doc.createElement('SCRIPT');
                el.setAttribute(attrName, attrValue);
                return el;
            };
            BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
                if (doc === void 0) { doc = document; }
                var style = doc.createElement('style');
                this.appendChild(style, this.createTextNode(css));
                return style;
            };
            BrowserDomAdapter.prototype.createShadowRoot = function (el) { return el.createShadowRoot(); };
            BrowserDomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
            BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
            BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
            BrowserDomAdapter.prototype.getElementsByClassName = function (element, name) {
                return element.getElementsByClassName(name);
            };
            BrowserDomAdapter.prototype.getElementsByTagName = function (element, name) {
                return element.getElementsByTagName(name);
            };
            BrowserDomAdapter.prototype.classList = function (element) { return Array.prototype.slice.call(element.classList, 0); };
            BrowserDomAdapter.prototype.addClass = function (element, classname) { element.classList.add(classname); };
            BrowserDomAdapter.prototype.removeClass = function (element, classname) { element.classList.remove(classname); };
            BrowserDomAdapter.prototype.hasClass = function (element, classname) { return element.classList.contains(classname); };
            BrowserDomAdapter.prototype.setStyle = function (element, stylename, stylevalue) {
                element.style[stylename] = stylevalue;
            };
            BrowserDomAdapter.prototype.removeStyle = function (element, stylename) { element.style[stylename] = null; };
            BrowserDomAdapter.prototype.getStyle = function (element, stylename) { return element.style[stylename]; };
            BrowserDomAdapter.prototype.tagName = function (element) { return element.tagName; };
            BrowserDomAdapter.prototype.attributeMap = function (element) {
                var res = {};
                var elAttrs = element.attributes;
                for (var i = 0; i < elAttrs.length; i++) {
                    var attrib = elAttrs[i];
                    res[attrib.name] = attrib.value;
                }
                return res;
            };
            BrowserDomAdapter.prototype.hasAttribute = function (element, attribute) { return element.hasAttribute(attribute); };
            BrowserDomAdapter.prototype.getAttribute = function (element, attribute) { return element.getAttribute(attribute); };
            BrowserDomAdapter.prototype.setAttribute = function (element, name, value) { element.setAttribute(name, value); };
            BrowserDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) {
                element.setAttributeNS(ns, name, value);
            };
            BrowserDomAdapter.prototype.removeAttribute = function (element, attribute) { element.removeAttribute(attribute); };
            BrowserDomAdapter.prototype.templateAwareRoot = function (el) { return this.isTemplateElement(el) ? this.content(el) : el; };
            BrowserDomAdapter.prototype.createHtmlDocument = function () {
                return document.implementation.createHTMLDocument('fakeTitle');
            };
            BrowserDomAdapter.prototype.defaultDoc = function () { return document; };
            BrowserDomAdapter.prototype.getBoundingClientRect = function (el) {
                try {
                    return el.getBoundingClientRect();
                }
                catch (e) {
                    return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
                }
            };
            BrowserDomAdapter.prototype.getTitle = function () { return document.title; };
            BrowserDomAdapter.prototype.setTitle = function (newTitle) { document.title = newTitle || ''; };
            BrowserDomAdapter.prototype.elementMatches = function (n, selector) {
                var matches = false;
                if (n instanceof HTMLElement) {
                    if (n.matches) {
                        matches = n.matches(selector);
                    }
                    else if (n.msMatchesSelector) {
                        matches = n.msMatchesSelector(selector);
                    }
                    else if (n.webkitMatchesSelector) {
                        matches = n.webkitMatchesSelector(selector);
                    }
                }
                return matches;
            };
            BrowserDomAdapter.prototype.isTemplateElement = function (el) {
                return el instanceof HTMLElement && el.nodeName == "TEMPLATE";
            };
            BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
            BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
            BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
            BrowserDomAdapter.prototype.hasShadowRoot = function (node) { return node instanceof HTMLElement && node.shadowRoot; };
            BrowserDomAdapter.prototype.isShadowRoot = function (node) { return node instanceof DocumentFragment; };
            BrowserDomAdapter.prototype.importIntoDoc = function (node) {
                var toImport = node;
                if (this.isTemplateElement(node)) {
                    toImport = this.content(node);
                }
                return document.importNode(toImport, true);
            };
            BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
            BrowserDomAdapter.prototype.getHref = function (el) { return el.href; };
            BrowserDomAdapter.prototype.getEventKey = function (event) {
                var key = event.key;
                if (!key) {
                    key = event.keyIdentifier;
                    // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
                    // Safari
                    // cf
                    // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
                    if (!key) {
                        return 'Unidentified';
                    }
                    if (key.startsWith('U+')) {
                        key = String.fromCharCode(parseInt(key.substring(2), 16));
                        if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                            // There is a bug in Chrome for numeric keypad keys:
                            // https://code.google.com/p/chromium/issues/detail?id=155654
                            // 1, 2, 3 ... are reported as A, B, C ...
                            key = _chromeNumKeyPadMap[key];
                        }
                    }
                }
                if (_keyMap.hasOwnProperty(key)) {
                    key = _keyMap[key];
                }
                return key;
            };
            BrowserDomAdapter.prototype.getGlobalEventTarget = function (target) {
                if (target == "window") {
                    return mz.globalContext.window;
                }
                else if (target == "document") {
                    return document;
                }
                else if (target == "body") {
                    return document.body;
                }
            };
            BrowserDomAdapter.prototype.getHistory = function () { return history; };
            BrowserDomAdapter.prototype.getLocation = function () { return location; };
            BrowserDomAdapter.prototype.getBaseHref = function () {
                var href = getBaseElementHref();
                if (!(href)) {
                    return null;
                }
                return relativePath(href);
            };
            BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
            BrowserDomAdapter.prototype.getUserAgent = function () { return navigator.userAgent; };
            BrowserDomAdapter.prototype.setData = function (element, name, value) {
                this.setAttribute(element, 'data-' + name, value);
            };
            BrowserDomAdapter.prototype.getData = function (element, name) { return this.getAttribute(element, 'data-' + name); };
            BrowserDomAdapter.prototype.getComputedStyle = function (element) { return getComputedStyle(element); };
            BrowserDomAdapter.prototype.requestAnimationFrame = function (callback) { return requestAnimationFrame(callback); };
            BrowserDomAdapter.prototype.cancelAnimationFrame = function (id) { cancelAnimationFrame(id); };
            BrowserDomAdapter.prototype.performanceNow = function () {
                // performance.now() is not available in all browsers, see
                // http://caniuse.com/#search=performance.now
                if (typeof performance != 'undefined' && performance.now) {
                    return performance.now();
                }
                else {
                    return (new Date).getTime() * 1000;
                }
            };
            return BrowserDomAdapter;
        })(GenericBrowserDomAdapter);
        dom.BrowserDomAdapter = BrowserDomAdapter;
        var baseElement = null;
        function getBaseElementHref() {
            if (!(baseElement)) {
                baseElement = document.querySelector('base');
                if (!(baseElement)) {
                    return null;
                }
            }
            return baseElement.getAttribute('href');
        }
        // based on urlUtils.js in AngularJS 1
        var urlParsingNode = null;
        function relativePath(url) {
            if (!(urlParsingNode)) {
                urlParsingNode = document.createElement("a");
            }
            urlParsingNode.setAttribute('href', url);
            return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
                '/' + urlParsingNode.pathname;
        }
        BrowserDomAdapter.makeCurrent();
    })(dom = mz.dom || (mz.dom = {}));
})(mz || (mz = {}));
/// <reference path="../DOM.ts" />
/// <reference path="DOM_BrowserImpl.ts" />
var mz;
(function (mz) {
    var dom;
    (function (dom) {
        var microqueue;
        (function (microqueue) {
            var hasSetImmediate = typeof setImmediate === 'function';
            function makeRequestFlushFromMutationObserver(flush) {
                var toggle = 1;
                var observer = new (mz.globalContext.MutationObserver || mz.globalContext.WebKitMutationObserver)(flush);
                var node = dom.adapter.createTextNode('');
                observer.observe(node, { characterData: true });
                return function requestFlush() {
                    toggle = -toggle;
                    node.data = toggle.toString();
                };
            }
            function makeRequestFlushFromTimer(flush) {
                return function requestFlush() {
                    // We dispatch a timeout with a specified delay of 0 for engines that
                    // can reliably accommodate that request. This will usually be snapped
                    // to a 4 milisecond delay, but once we're flushing, there's no delay
                    // between events.
                    var timeoutHandle = setTimeout(handleFlushTimer, 0);
                    // However, since this timer gets frequently dropped in Firefox
                    // workers, we enlist an interval handle that will try to fire
                    // an event 20 times per second until it succeeds.
                    var intervalHandle = setInterval(handleFlushTimer, 50);
                    function handleFlushTimer() {
                        // Whichever timer succeeds will cancel both timers and request the
                        // flush.
                        clearTimeout(timeoutHandle);
                        clearInterval(intervalHandle);
                        flush();
                    }
                };
            }
            function onError(error) {
                if (hasSetImmediate) {
                    setImmediate(function () { throw error; });
                }
                else {
                    setTimeout(function () { throw error; }, 0);
                }
            }
            /**
            * Implements an asynchronous task queue.
            */
            var MicroTaskQueue = (function () {
                function MicroTaskQueue() {
                    var _this = this;
                    /**
                     * Creates an instance of TaskQueue.
                    */
                    this.microTaskQueue = [];
                    this.taskQueue = [];
                    this.microTaskQueueCapacity = 1024;
                    this.flushing = false;
                    if (mz.globalContext.MutationObserver || mz.globalContext.WebKitMutationObserver) {
                        this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function () { return _this.flushMicroTaskQueue(); });
                    }
                    else {
                        this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function () { return _this.flushMicroTaskQueue(); });
                    }
                }
                /**
                 * Queues a task on the micro task queue for ASAP execution.
                * @param task The task to queue up for ASAP execution.
                */
                MicroTaskQueue.prototype.queueMicroTask = function (task) {
                    if (this.microTaskQueue.length < 1) {
                        this.requestFlushMicroTaskQueue();
                    }
                    this.microTaskQueue.push(task);
                };
                /**
                 * Immediately flushes the micro task queue.
                */
                MicroTaskQueue.prototype.flushMicroTaskQueue = function () {
                    var queue = this.microTaskQueue;
                    var capacity = this.microTaskQueueCapacity;
                    var index = 0;
                    var task;
                    if (this.flushing)
                        return;
                    this.flushing = true;
                    try {
                        while (index < queue.length) {
                            task = queue[index];
                            switch (task.type) {
                                case MicroQueueOpKind.APPEND:
                                    dom.adapter.appendChild(task.destination, task.parameters);
                                    break;
                                case MicroQueueOpKind.DETACH:
                                    dom.adapter.remove(task.destination);
                                    break;
                                case MicroQueueOpKind.SET_TEXT:
                                    if (task.destination.textContent != task.parameters)
                                        dom.adapter.setText(task.destination, task.parameters);
                                    break;
                                case MicroQueueOpKind.SET_ATTR:
                                    dom.adapter.setAttribute(task.destination, task.parameters[0], task.parameters[1]);
                                    break;
                                case MicroQueueOpKind.CALLBACK:
                                    task.destination();
                                    break;
                            }
                            index++;
                            // Prevent leaking memory for long chains of recursive calls to `queueMicroTask`.
                            // If we call `queueMicroTask` within a MicroTask scheduled by `queueMicroTask`, the queue will
                            // grow, but to avoid an O(n) walk for every MicroTask we execute, we don't
                            // shift MicroTasks off the queue after they have been executed.
                            // Instead, we periodically shift 1024 MicroTasks off the queue.
                            if (index > capacity) {
                                // Manually shift all values starting at the index back to the
                                // beginning of the queue.
                                for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                                    queue[scan] = queue[scan + index];
                                }
                                queue.length -= index;
                                index = 0;
                            }
                        }
                    }
                    catch (error) {
                        onError(error);
                    }
                    this.flushing = false;
                    queue.length = 0;
                };
                return MicroTaskQueue;
            })();
            var MicroQueueOpKind;
            (function (MicroQueueOpKind) {
                MicroQueueOpKind[MicroQueueOpKind["APPEND"] = 0] = "APPEND";
                MicroQueueOpKind[MicroQueueOpKind["DETACH"] = 1] = "DETACH";
                MicroQueueOpKind[MicroQueueOpKind["SET_TEXT"] = 2] = "SET_TEXT";
                MicroQueueOpKind[MicroQueueOpKind["SET_ATTR"] = 3] = "SET_ATTR";
                MicroQueueOpKind[MicroQueueOpKind["CALLBACK"] = 4] = "CALLBACK";
            })(MicroQueueOpKind || (MicroQueueOpKind = {}));
            microqueue.enabled = true;
            var theMicroDomTaskQueue = new MicroTaskQueue;
            function flush() {
                theMicroDomTaskQueue.flushMicroTaskQueue();
            }
            microqueue.flush = flush;
            function appendChild(el, node) {
                if (!microqueue.enabled) {
                    dom.adapter.appendChild(el, node);
                    return;
                }
                theMicroDomTaskQueue.queueMicroTask({
                    type: MicroQueueOpKind.APPEND,
                    destination: el,
                    parameters: node
                });
            }
            microqueue.appendChild = appendChild;
            function callback(cb) {
                if (!microqueue.enabled) {
                    cb();
                    return;
                }
                theMicroDomTaskQueue.queueMicroTask({
                    type: MicroQueueOpKind.CALLBACK,
                    destination: cb
                });
            }
            microqueue.callback = callback;
            function remove(el) {
                if (!microqueue.enabled) {
                    dom.adapter.remove(el);
                    return;
                }
                theMicroDomTaskQueue.queueMicroTask({
                    type: MicroQueueOpKind.DETACH,
                    destination: el
                });
            }
            microqueue.remove = remove;
            function setText(el, text) {
                if (!microqueue.enabled) {
                    dom.adapter.setText(el, text);
                    return;
                }
                theMicroDomTaskQueue.queueMicroTask({
                    type: MicroQueueOpKind.SET_TEXT,
                    destination: el,
                    parameters: text
                });
            }
            microqueue.setText = setText;
            function setAttribute(el, attr, value) {
                if (!microqueue.enabled) {
                    dom.adapter.setAttribute(el, attr, value);
                    return;
                }
                theMicroDomTaskQueue.queueMicroTask({
                    type: MicroQueueOpKind.SET_ATTR,
                    destination: el,
                    parameters: [attr, value]
                });
            }
            microqueue.setAttribute = setAttribute;
        })(microqueue = dom.microqueue || (dom.microqueue = {}));
    })(dom = mz.dom || (mz.dom = {}));
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
/// <reference path="Tmpl.ts" />
/// <reference path="Helpers.ts" />
/// <reference path="../CORE/MVCObject.ts" />
/// <reference path="../CORE/Decorators.ts" />
/// <reference path="TextNode.ts" />
/// <reference path="../CORE/DOM/MicroQueue.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var mz;
(function (mz) {
    var AttributeDirective = (function () {
        function AttributeDirective(widget, component, value) {
            this.widget = widget;
            this.component = component;
            this.value = value;
            this.mount();
        }
        AttributeDirective.prototype.mount = function () {
        };
        AttributeDirective.prototype.unmount = function () {
            delete this.widget;
            delete this._value;
        };
        AttributeDirective.prototype.changed = function (value, prevValue) {
        };
        Object.defineProperty(AttributeDirective.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value !== this._value) {
                    var prevValue = this._value;
                    this._value = value;
                    this.changed(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        return AttributeDirective;
    })();
    mz.AttributeDirective = AttributeDirective;
    var AttributeDirective;
    (function (AttributeDirective) {
        function Register(attrName) {
            return function (target) {
                var lowerCaseName = attrName.toLowerCase();
                if (lowerCaseName in AttributeDirective.directives) {
                    console.warn("There is alredy a directive for '" + lowerCaseName + "'. It would be replaced.");
                }
                AttributeDirective.directives[lowerCaseName] = target;
            };
        }
        AttributeDirective.Register = Register;
        AttributeDirective.directives = {};
    })(AttributeDirective = mz.AttributeDirective || (mz.AttributeDirective = {}));
    var templateCache = {};
    var paramRegex = /^__(\d+)$/;
    var tieneLlaves = /\{|\}/;
    var testScope = /^{scope\./;
    var enableListener = function (listener) {
        listener.enable();
    };
    function setScopeRecursiveAndEnableListeners(list, scope) {
        for (var i = 0; i < list.length; i++) {
            var w = list[i];
            if (w) {
                if (w instanceof mz.widgets.TextNode) {
                    w.scope = scope;
                    w.refreshScope();
                }
                else if (w instanceof Widget) {
                    w.children && w.children.length && setScopeRecursiveAndEnableListeners(w.children, scope);
                    w.listening && w.listening.forEach(enableListener);
                    w.scope = scope;
                    w.refreshScope();
                }
            }
        }
    }
    var containsScope = /[\{|\s|\(|\[]scope[\.|\s|\[|\(]/;
    var parser = new DOMParser();
    var errorDoc, errorNs;
    try {
        errorDoc = parser.parseFromString('INVALID', 'text/xml');
        errorNs = errorDoc.getElementsByTagName("parsererror")[0].namespaceURI;
    }
    catch (e) { }
    // turns the array of string parts into a DOM
    // throws if the result is an invalid XML document.
    function quasiToDom(parts) {
        // turn ["<div class='", "'>Hi</div>"]
        // into "<div class='__0'>Hi</div>"
        var xmlstr = parts.reduce(function (xmlstr, part, i) {
            xmlstr += part;
            if (i != parts.length - 1) {
                xmlstr += "__" + i;
            }
            return xmlstr;
        }, "");
        // parse into DOM, check for a parse error
        // browser's DOMParser is neat, but error handling is awful
        var doc = parser.parseFromString(xmlstr, 'text/xml');
        var errors = doc.getElementsByTagNameNS(errorNs, 'parsererror');
        var error = '';
        if (errors.length > 0) {
            error = errors[0].textContent.split('\n')[0];
            throw "invalid jsx: " + error + "\n" + xmlstr;
        }
        return doc;
    }
    var lonelyProperty = /^\{([A-Za-z0-9_$\-]+)\}$/;
    var lonelyPropertyThis = /^\{this\.([A-Za-z0-9_$\-]+)\}$/;
    /**
    * Esta función es usada para bindear un atributo a los cambios de MVCObject que pueden llegar a modificar el valor del atributo
    */
    function bindWidgetAttr(attrName, attrValue, observable, widget, scope) {
        var match;
        // attr="{hola}" 
        // mando directamente Val(hola) a el atributo
        if ((match = lonelyProperty.exec(attrValue)) || (match = lonelyPropertyThis.exec(attrValue))) {
            return observable.on(match[1] + '_changed', function (a, b) {
                if (a !== b || typeof a === "object") {
                    if (widget.attr(attrName) != a)
                        widget.attr(attrName, a);
                }
            });
        }
        else {
            return observable.on('valueChanged', function (data, elem, a, b) {
                if ((a !== b || typeof a === "object") && attrValue.indexOf(elem) != -1) {
                    var t = mz.view.tmpl(attrValue, observable, widget.data.scope);
                    if (widget.attr(attrName) != t)
                        widget.attr(attrName, t);
                }
            });
        }
    }
    var boolAttrs = ('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,' +
        'defaultchecked,defaultmuted,defaultselected,defer,disabled,draggable,enabled,formnovalidate,hidden,' +
        'indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,' +
        'pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,spellcheck,translate,truespeed,' +
        'typemustmatch,visible').split(',');
    boolAttrs.forEach(function (a) { return boolAttrs[a] = true; });
    /**
    * Local template's document caché
    */
    mz.widgetTemplateSource = {};
    var tmpl_pointer = mz.view.tmpl;
    function domToWidgets(node, params, component, scope) {
        var match;
        // text node, comment, etc
        if (node instanceof CDATASection) {
            return mz.dom.adapter.createTextNode(node.nodeValue);
        }
        var hasScope = arguments.length == 4;
        if (node.nodeValue) {
            if (node.nodeType == node.COMMENT_NODE)
                return;
            var value = node.nodeValue;
            if (value.trim().length === 0) {
                return;
            }
            match = value.match(paramRegex);
            if (match)
                return params[parseInt(match[1])];
            // detect if we have {} on the text
            if (tieneLlaves.test(value)) {
                var childWidget = mz.widgets.TextNode.getFromPoll(value, component, scope);
                // We don't mess with "{scope.hola}" expr
                // But we do with 
                if (component && !(testScope.test(value))) {
                    // If the expr is "{prop}" or "{this.prop}" we assume a proxy
                    if ((match = lonelyProperty.exec(value)) || (match = lonelyPropertyThis.exec(value))) {
                        childWidget.listening.push(component.on(match[1] + '_changed', function (a, b) {
                            if (a != b || typeof a == "object") {
                                if (typeof a === "undefined" || a === null)
                                    a = '';
                                //if (childWidget.rootNode.textContent != a)
                                //    childWidget.rootNode.textContent = a;
                                mz.dom.microqueue.setText(childWidget.rootNode, a);
                            }
                        }));
                    }
                    else {
                        // catch other samples, ex: "$ {this.value + scope.value} {currency}"
                        childWidget.listening.push(component.on('valueChanged', function (data, elem, a, b) {
                            if ((a != b || typeof a == "object") && value.indexOf(elem) != -1) {
                                childWidget.refreshScope();
                            }
                        }));
                    }
                }
                return childWidget;
            }
            if (typeof value == "string")
                return document.createTextNode(value);
            return value;
        }
        var widgetCtor;
        match = node.localName.match(paramRegex);
        widgetCtor = match ? params[parseInt(match[1])] : mz.widgets[node.localName.toLowerCase()];
        var name = null;
        // attributes of the node
        var attrs = {};
        /**
         * Guardo en este diccionario los atributos del widget que puedo llegar a bindear al objeto (los que tienne llaves)
         * */
        var bindeableAttrs = {};
        var listenersConLlaves = [];
        for (var i = node.attributes.length - 1; i >= 0; i--) {
            var attr = node.attributes[i];
            attrs[attr.name] = attr.value;
            match = attr.value.match(paramRegex);
            // __0, __1
            if (match) {
                attrs[attr.name] = params[parseInt(match[1])];
            }
            else {
                if (typeof attr.value === "string") {
                    attrs[attr.name] = mz.view.tmpl(attr.value, component, scope);
                    if (typeof attrs[attr.name] === "function") {
                        attrs[attr.name] = attrs[attr.name].bind(component);
                    }
                    else if (tieneLlaves.test(attr.value)) {
                        bindeableAttrs[attr.name] = attr.value;
                    }
                }
            }
            if (attr.name == 'name') {
                name = attrs[attr.name];
            }
            if (attr.name == 'scope') {
                scope = attrs[attr.name];
            }
        }
        widgetCtor = widgetCtor || mz.widgets.BaseElement;
        var hijos = widgetCtor.EMPTY_TAG ? [] : getChildNodes(node, params, component, scope);
        var ret = new widgetCtor(node, attrs, hijos, params, component, scope);
        for (var attrName in bindeableAttrs) {
            listenersConLlaves.push({
                name: attrName,
                fn: (function (value, component) {
                    return function () {
                        return tmpl_pointer(value, component, ret.scope || undefined);
                    };
                })(bindeableAttrs[attrName], component)
            });
        }
        if (listenersConLlaves.length)
            ret.mustUpdateOnScopeChange = listenersConLlaves;
        for (var at in bindeableAttrs) {
            if (typeof bindeableAttrs[at] == "string" && component)
                ret.listening.push(bindWidgetAttr(at, bindeableAttrs[at], component, ret, scope));
        }
        if (node.nodeName == "content" && (!component._contentSelector || component._contentSelector == "content")) {
            component.contentNode = ret.rootNode;
        }
        if (name && component) {
            component[name] = ret;
        }
        return ret;
    }
    function getChildNodes(node, params, component, scope) {
        // recursively turn children into components
        var childNodes = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            var childWidget = domToWidgets(node.childNodes[i], params, component, scope);
            if (childWidget) {
                childNodes.push(childWidget);
            }
        }
        return childNodes;
    }
    function getJQueryEventWrapper(originalCallback, widget) {
        return function (event) {
            var eventObject = {
                event: event.originalEvent,
                data: widget.scope,
                element: widget.rootNode
            };
            return originalCallback.call(widget, eventObject);
        };
    }
    function errorLoadingTemplate(ev) {
        console.error("Error loading template. ", this, ev);
    }
    var regexpOn = /^on[_]{0,1}(.*)$/;
    var ignoredAttrs = { tag: 1 };
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(originalNode, attr, children, _params, _parentComponent, scope) {
            var _this = this;
            if (_params === void 0) { _params = null; }
            if (_parentComponent === void 0) { _parentComponent = null; }
            _super.call(this);
            this._params = _params;
            this._parentComponent = _parentComponent;
            this.listening = [];
            this.innerWidget = null;
            this.originalNode = originalNode;
            this.contentFragment = document.createDocumentFragment();
            this.contentNode = this.rootNode = document.createElement(attr && attr["tag"] || originalNode && originalNode.nodeName || this["constructor"].nodeName || this["constructor"].name || 'div');
            this.rootNode.$widget = this;
            this.rootNode.$component = _parentComponent;
            this.scope = scope;
            this.children = children;
            if (this.defaultTemplate) {
                this.startComponent([this.defaultTemplate]);
                mz.dom.microqueue.callback(function () {
                    _this.componentInitialized();
                    _this.emit(Widget.EVENTS.ComponentMounted);
                });
            }
            if (attr) {
                this.initAttr(attr);
            }
            if (this.defaultTemplate) {
                this.appendChildrens();
            }
            if (this.remoteTemplate)
                this.loadTemplate(this.remoteTemplate);
        }
        Widget.prototype.scope_changed = function (scope) {
            this.rootNode.$scope = scope;
        };
        Object.defineProperty(Widget.prototype, "DOM", {
            get: function () {
                return this._cachedDOM || (this._cachedDOM = $(this.rootNode));
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.generateScopedContent = function (scope) {
            // check if i have an element from object pool
            if (this.scopedContentPool && this.scopedContentPool.length) {
                var scopedContent = this.scopedContentPool.pop();
                setScopeRecursiveAndEnableListeners(scopedContent, scope);
                return scopedContent;
            }
            // elsewhere, let's create the object
            return getChildNodes(this.originalNode, this._params, this._parentComponent, scope || null);
        };
        Widget.prototype.releaseScopedContent = function (scopedContent) {
            // create object poll if necesary
            if (!this.scopedContentPool)
                this.scopedContentPool = [];
            for (var i = 0; i < scopedContent.length; i++) {
                var e = scopedContent[i];
                if (e.rootNode)
                    mz.dom.adapter.remove(e.rootNode);
                if (e.listening) {
                    for (var evt = 0; evt < e.listening.length; evt++) {
                        e.listening[evt].disable();
                    }
                }
            }
            this.scopedContentPool.push(scopedContent);
        };
        Widget.prototype.attr = function (attrName, value) {
            var attrNameLower = attrName.toLowerCase();
            if (arguments.length == 1) {
                if (this.attrDirectives && attrNameLower in this.attrDirectives)
                    return this.attrDirectives[attrNameLower].value;
                return this.data[attrName];
            }
            else {
                var boolAttr = attrNameLower in boolAttrs;
                var typeofValue = typeof value;
                if (boolAttr) {
                    if (typeofValue === "function")
                        value = value();
                    value = mz.CBool(value);
                    typeofValue = "boolean";
                }
                var prevValue = this.get(attrName);
                if (attrNameLower in AttributeDirective.directives && AttributeDirective.directives[attrNameLower]) {
                    if (!this.attrDirectives)
                        this.attrDirectives = {};
                    if (attrNameLower in this.attrDirectives)
                        this.attrDirectives[attrNameLower].value = value;
                    else
                        this.attrDirectives[attrNameLower] = new AttributeDirective.directives[attrNameLower](this, this._parentComponent, value);
                    this.set(attrName, this.attrDirectives[attrNameLower].value);
                }
                else {
                    this.set(attrName, value);
                    if (boolAttr) {
                        if (value) {
                            if (!mz.dom.adapter.hasAttribute(this.rootNode, attrName))
                                mz.dom.adapter.setAttribute(this.rootNode, attrName, attrName);
                        }
                        else {
                            if (mz.dom.adapter.hasAttribute(this.rootNode, attrName))
                                mz.dom.adapter.removeAttribute(this.rootNode, attrName);
                        }
                        if (attrName in this.rootNode && typeof (this.rootNode[attrName] == "boolean" || typeof this.rootNode[attrName] == "undefined")) {
                            this.rootNode[attrName] = value;
                        }
                    }
                    else if (regexpOn.test(attrName) && typeofValue === "function" && value !== prevValue) {
                        var cbName = regexpOn.exec(attrName)[1];
                        if (/^on_/.test(attrName)) {
                            prevValue && this.off(cbName, prevValue);
                            this.listening.push(this.on(cbName, value));
                        }
                        else {
                            this.DOM.off(cbName);
                            this.DOM.on(cbName, getJQueryEventWrapper(value, this));
                        }
                    }
                    else {
                        if ((typeofValue === "string" || typeofValue === "number" || typeofValue === "boolean") && !(/^:/.test(attrName))) {
                            if (attrNameLower in ignoredAttrs)
                                return;
                            mz.dom.microqueue.setAttribute(this.rootNode, attrName, value);
                        }
                    }
                }
            }
        };
        Widget.prototype.refreshScope = function () {
            // attr generators
            if (this.mustUpdateOnScopeChange) {
                for (var i = 0; i < this.mustUpdateOnScopeChange.length; i++) {
                    var e = this.mustUpdateOnScopeChange[i];
                    this.attr(e.name, e.fn());
                }
            }
            for (var index = 0; index < this.children.length; index++) {
                var e = this.children[index];
                if (e && typeof e == "object") {
                    e.refreshScope && e.refreshScope();
                }
            }
        };
        // Finds an element within this component
        Widget.prototype.find = function (selector) {
            mz.dom.microqueue.flush();
            return mz.dom.adapter.querySelectorAll(this.rootNode, selector);
        };
        Widget.prototype.loadTemplate = function (url, forceSync) {
            var _this = this;
            if (forceSync === void 0) { forceSync = false; }
            if (url in mz.widgetTemplateSource) {
                this.startComponent(mz.widgetTemplateSource[url]);
                this.componentInitialized();
                //this.emit(Widget.EVENTS.ComponentMounted);
                //requestAnimationFrame(() => this.resize());
                mz.dom.microqueue.callback(function () {
                    _this.resize();
                    _this.emit(Widget.EVENTS.ComponentMounted);
                });
                return;
            }
            var xhr = new XMLHttpRequest();
            var transformedUrl = mz.getPath(url);
            xhr.addEventListener('load', function (ev) {
                if (xhr.responseXML && xhr.responseXML instanceof Document) {
                    mz.widgetTemplateSource[url] = xhr.responseXML;
                    _this.startComponent(xhr.responseXML);
                    _this.componentInitialized();
                    //this.emit(Widget.EVENTS.ComponentMounted);
                    mz.dom.microqueue.callback(function () {
                        _this.resize();
                        _this.emit(Widget.EVENTS.ComponentMounted);
                    });
                }
                else if (xhr.responseText && xhr.responseText.length) {
                    mz.widgetTemplateSource[url] = [xhr.responseText];
                    _this.startComponent([xhr.responseText], []);
                    _this.componentInitialized();
                    //this.emit(Widget.EVENTS.ComponentMounted);
                    mz.dom.microqueue.callback(function () {
                        _this.resize();
                        _this.emit(Widget.EVENTS.ComponentMounted);
                    });
                }
                else {
                    throw new TypeError("Unexpected response for mz.Widget.loadTemplate. Url: " + transformedUrl + ' (' + url + ')');
                }
            });
            xhr.onerror = errorLoadingTemplate;
            xhr.open("GET", transformedUrl, !forceSync);
            xhr.send();
        };
        Widget.prototype.componentInitialized = function () {
        };
        Widget.prototype.startComponent = function (parts) {
            var _this = this;
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (parts) {
                var doc = parts instanceof Array ? quasiToDom(parts) : parts;
                params = params || [];
                params.forEach(function (e, i) {
                    if (typeof e === "function")
                        params[i] = e.bind(_this);
                });
                if (doc.childNodes.length > 1)
                    console.warn("Only one child node is allowed per widget.", doc, this);
                this.innerWidget = domToWidgets(doc.firstChild, params, this);
            }
            if (this._unwrapedComponent) {
                var originalNode = this.rootNode;
                if (this.innerWidget) {
                    this.rootNode = this.innerWidget.rootNode;
                    if (this.rootNode != originalNode) {
                        for (var i = 0; i < originalNode.attributes.length; i++) {
                            var attrib = originalNode.attributes[i];
                            if (!('specified' in attrib) || attrib.specified) {
                                if (attrib.name.toLowerCase() == "class")
                                    mz.dom.adapter.addClass(this.rootNode, attrib.value);
                                else
                                    mz.dom.adapter.setAttribute(this.rootNode, attrib.name, attrib.value);
                            }
                        }
                        if (originalNode && originalNode.parentElement) {
                            mz.dom.adapter.replaceChild(originalNode.parentElement, this.rootNode, originalNode);
                        }
                    }
                }
            }
            else {
                this.innerWidget && mz.dom.adapter.appendChild(this.rootNode, this.innerWidget.rootNode);
            }
            if (!this.contentNode)
                this.contentNode = this.rootNode || this.contentNode;
            var apendeado = false;
            if (this._contentSelector)
                apendeado = this.findContentSelector();
            if (!apendeado)
                this.appendChildrens();
            return this.innerWidget;
        };
        Widget.prototype.appendChildrens = function () {
            var _this = this;
            this.children.forEach(function (element) {
                if (element && typeof element == "object") {
                    if ('rootNode' in element && element.rootNode instanceof Node)
                        _this.contentFragment.appendChild(element.rootNode);
                    else if ('DOM' in element && element.DOM)
                        element.DOM.appendTo(_this.contentFragment);
                    else if ('node' in element && element.node)
                        _this.contentFragment.appendChild(element.node);
                    else if (element instanceof Node)
                        _this.contentFragment.appendChild(element);
                    else if (mz._debug)
                        console.warn("Trying to add unknown child ", element, " to Widget!", _this);
                }
                else if (element && typeof element == "string" && element.length > 0) {
                    _this.contentFragment.appendChild(document.createTextNode(element));
                }
            });
            if (this.contentNode) {
                this.contentNode.appendChild(this.contentFragment);
            }
            else if (this.contentFragment.firstChild) {
                console.error("There is child elements on a Widget with wrong or without contentSelector ", this);
            }
        };
        Widget.prototype.findContentSelector = function () {
            var prevContent = this.contentNode;
            this.contentNode = this._contentSelector == ":root" ? this.rootNode : mz.dom.adapter.querySelector(this.rootNode, this._contentSelector);
            if (prevContent !== this.contentNode && this.contentNode) {
                this.appendChildrens();
                return true;
            }
            return false;
        };
        Widget.prototype.append = function (element) {
            if (element && typeof element == "object") {
                if (element instanceof Node) {
                    this.contentNode.appendChild(element);
                }
                else if (element instanceof Widget) {
                    this.contentNode.appendChild(element.rootNode);
                }
                else if (element instanceof mz.widgets.TextNode) {
                    this.contentNode.appendChild(element.rootNode);
                }
                else if (element instanceof $) {
                    return element.appendTo($(this.contentNode));
                }
                else if ('DOM' in element && element.DOM instanceof $) {
                    return element.DOM.appendTo($(this.contentNode));
                }
                else {
                    return this.contentNode && $(element).appendTo(this.contentNode);
                }
            }
        };
        Widget.prototype.appendTo = function (element) {
            if (element && element instanceof Widget) {
                return element.append(this);
            }
            else if (element && typeof element == "object" && 'DOM' in element && element.DOM instanceof $) {
                return element.DOM.append(this.rootNode);
            }
            else if (element && element instanceof $) {
                return element.append(this.rootNode);
            }
            else {
                return $(element).append(this.rootNode);
            }
        };
        Widget.prototype.initAttr = function (attr) {
            if (attr) {
                for (var i in attr) {
                    this.attr(i, attr[i]);
                }
            }
        };
        /**
         * Resizes the current widget, it also sends a signal "resize" to all the childrens
         */
        Widget.prototype.resize = function () {
            this.emit(Widget.EVENTS.ComponentResized);
            this.innerWidget && this.innerWidget.resize && this.innerWidget.resize();
            this.children.forEach(function (e) { return e && typeof e == 'object' && e.resize && e.resize(); });
        };
        /**
         *  Destroys the current widget and it's children
         */
        Widget.prototype.unmount = function () {
            if (this.attrDirectives)
                for (var i_2 in this.attrDirectives)
                    ('unmount' in this.attrDirectives) && this.attrDirectives[i_2].unmount();
            mz.dom.adapter.remove(this.rootNode);
            this._cachedDOM && this._cachedDOM.remove();
            this.emit(Widget.EVENTS.ComponentUnmounted);
            this.off();
            if (this.scopedContentPool) {
                for (var i = 0; i < this.scopedContentPool.length; i++) {
                    var p = this.scopedContentPool[i];
                    for (var sub_i = 0; sub_i < p.length; sub_i++) {
                        var element = p[sub_i];
                        'unmount' in element && element.unmount();
                    }
                    p.length = 0;
                }
                this.scopedContentPool.length = 0;
                delete this.scopedContentPool;
            }
            for (var _i = 0, _a = this.listening; _i < _a.length; _i++) {
                var i_3 = _a[_i];
                i_3 && i_3.off && i_3.off();
            }
            this.listening.length = 0;
            delete this.data;
            for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
                var e = _c[_b];
                if ('unmount' in e)
                    e.unmount();
            }
            this.children.length = 0;
        };
        Widget.RegisterComponent = function (componentName) {
            return function (target) {
                if (componentName.toLowerCase() in mz.widgets)
                    console.warn("Component ", componentName, " alredy registered");
                target.nodeName = componentName;
                mz.widgets[componentName.toLowerCase()] = target;
            };
        };
        Widget.ConfigureEmptyTag = function (target) {
            target.EMPTY_TAG = true;
        };
        Widget.Template = function (template, contentSelector) {
            if (template) {
                if (/^<(.*)>/.test(template.trim()))
                    return function (target) {
                        target.prototype.defaultTemplate = template;
                        if (contentSelector && contentSelector.length)
                            target.prototype._contentSelector = contentSelector;
                    };
                else if (template.startsWith('#')) {
                    return function (target) {
                        target.prototype.selectorTemplate = template;
                        if (contentSelector && contentSelector.length)
                            target.prototype._contentSelector = contentSelector;
                    };
                }
                else {
                    return function (target) {
                        target.prototype.remoteTemplate = template;
                        if (contentSelector && contentSelector.length)
                            target.prototype._contentSelector = contentSelector;
                    };
                }
            }
            else
                return function (target) {
                    if (contentSelector && contentSelector.length)
                        target.prototype._contentSelector = contentSelector;
                };
        };
        Widget.ConfigureUnwrapped = function (target) {
            target.prototype._unwrapedComponent = true;
        };
        Widget.ConfigureTag = function (tagName) {
            return function (target) {
                target.prototype.tagName = true;
            };
        };
        Widget.Attribute = function (target, propertyKey) {
            if (delete target[propertyKey]) {
                Object.defineProperty(target, propertyKey.toString(), {
                    get: function () {
                        return this.attr(propertyKey);
                    },
                    set: function (value) {
                        this.attr(propertyKey, value);
                    },
                    enumerable: true
                });
            }
        };
        Widget.EMPTY_TAG = false;
        Widget.props = {};
        Widget.nodeName = null;
        Widget.EVENTS = mz.copy({
            ComponentUnmounted: 'unmount',
            ComponentResized: 'resize',
            ComponentMounted: 'mount'
        }, mz.MVCObject.EVENTS);
        __decorate([
            mz.MVCObject.proxy, 
            __metadata('design:type', Object)
        ], Widget.prototype, "scope", void 0);
        return Widget;
    })(mz.MVCObject);
    mz.Widget = Widget;
})(mz || (mz = {}));
var mz;
(function (mz) {
    var widgets;
    (function (widgets) {
        var BaseElement = (function (_super) {
            __extends(BaseElement, _super);
            function BaseElement(rootNode, attr, children, _params, _parentComponent, scope) {
                if (_params === void 0) { _params = null; }
                if (_parentComponent === void 0) { _parentComponent = null; }
                if (scope === void 0) { scope = null; }
                if (rootNode)
                    attr['tag'] = rootNode.nodeName;
                _super.call(this, rootNode, attr, children, _params, _parentComponent, scope);
                this.appendChildrens();
            }
            return BaseElement;
        })(mz.Widget);
        widgets.BaseElement = BaseElement;
        var BasePagelet = (function (_super) {
            __extends(BasePagelet, _super);
            function BasePagelet(attr) {
                _super.call(this, null, attr || {}, [], this, this, null);
            }
            return BasePagelet;
        })(mz.Widget);
        widgets.BasePagelet = BasePagelet;
        var InlinePagelet = (function (_super) {
            __extends(InlinePagelet, _super);
            function InlinePagelet(template, attr) {
                _super.call(this, null, attr || {}, [], this, this, null);
                this.startComponent([template]);
            }
            return InlinePagelet;
        })(mz.Widget);
        widgets.InlinePagelet = InlinePagelet;
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));
/// <reference path="../view/Widget.ts" />
var mz;
(function (mz) {
    var widgets;
    (function (widgets) {
        var MzSwitcher = (function (_super) {
            __extends(MzSwitcher, _super);
            function MzSwitcher(rootNode, attr, children, a, b, scope) {
                var _this = this;
                _super.call(this, rootNode, attr, [], a, b, scope);
                this.panels = new mz.Collection();
                var first = null;
                // Set the parent panel to the children
                children.forEach(function (child) {
                    if (child instanceof MzSwitcherPanel) {
                        first = first || child;
                        child.parent = _this;
                    }
                });
                if (first)
                    this.show(first);
            }
            MzSwitcher.prototype.show = function (panel) {
                if (!panel)
                    return;
                if (this.panelVisible === panel)
                    return;
                if (!this.panels.contains(panel)) {
                    this.panels.push(panel);
                    panel.appendTo(this.contentNode);
                    if (panel instanceof MzSwitcherPanel) {
                        panel.parent = this;
                    }
                }
                if (this.panelVisible) {
                    mz.dom.adapter.remove(this.panelVisible.rootNode);
                }
                this.panelVisible = panel;
                mz.dom.adapter.appendChild(this.contentNode, this.panelVisible.rootNode);
                this.panelVisible.show();
                panel.resize();
            };
            MzSwitcher.prototype.resize = function () {
                if (this.panelVisible) {
                    this.panelVisible.resize();
                }
                _super.prototype.resize.call(this);
            };
            __decorate([
                mz.MVCObject.proxy, 
                __metadata('design:type', MzSwitcherPanel)
            ], MzSwitcher.prototype, "panelVisible", void 0);
            MzSwitcher = __decorate([
                mz.Widget.RegisterComponent("mz-switcher"), 
                __metadata('design:paramtypes', [Node, Object, Array, Object, Object, Object])
            ], MzSwitcher);
            return MzSwitcher;
        })(mz.Widget);
        widgets.MzSwitcher = MzSwitcher;
        var MzSwitcherPanel = (function (_super) {
            __extends(MzSwitcherPanel, _super);
            function MzSwitcherPanel() {
                _super.apply(this, arguments);
            }
            MzSwitcherPanel.prototype.show = function () {
                if (this.parent)
                    this.parent.show(this);
            };
            MzSwitcherPanel.prototype.isVisible = function () {
                return this.DOM.is(':visible');
            };
            MzSwitcherPanel = __decorate([
                mz.Widget.RegisterComponent("mz-switcher-panel"), 
                __metadata('design:paramtypes', [])
            ], MzSwitcherPanel);
            return MzSwitcherPanel;
        })(mz.Widget);
        widgets.MzSwitcherPanel = MzSwitcherPanel;
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));
/// <reference path="../WIDGETS/mz-switcher.ts" />
var mz;
(function (mz) {
    var app;
    (function (app) {
        /**
         * Binds a ROUTE_NAME to this method.
         * pages.json#
         * [{
         *   name: "index",
         *   module: "index.ts",
         *   routes: {
         *     "index/:id": "ROUTE_NAME"
         *   }
         * },
         * ...]
         * By default, the target method's name is used
         */
        function RouteName(route_name) {
            return function (target, propertyKey) {
                if (target[propertyKey] && typeof target[propertyKey] === "function") {
                    target[propertyKey].isRouteHandler = route_name || propertyKey;
                }
            };
        }
        app.RouteName = RouteName;
        var Page = (function (_super) {
            __extends(Page, _super);
            function Page(appController) {
                _super.call(this, null, { tag: 'div', }, [], this, this, this);
                this.routeHandler = {};
                var componentProps = Reflect.getPrototypeOf(this);
                if (componentProps) {
                    for (var i in componentProps) {
                        if (typeof this[i] == "function" && this[i].isRouteHandler) {
                            this.routeHandler[this[i].isRouteHandler] = this[i];
                        }
                    }
                }
                this.parent = appController;
                this.resize = mz.screenDelayer(this.resize, this);
            }
            Page.prototype.windowTitle_changed = function () {
                this.parent && this.parent.updatePageTitle();
            };
            Page.prototype.handleRoute = function (routeName) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
            };
            Page.prototype.show = function () {
                var _this = this;
                _super.prototype.show.call(this);
                this.parent.actualPage = this;
                this.parent.actualPageName = this.pageControllerName;
                requestAnimationFrame(function () { return _this.resize(); });
            };
            __decorate([
                Page.proxy, 
                __metadata('design:type', String)
            ], Page.prototype, "windowTitle", void 0);
            return Page;
        })(mz.widgets.MzSwitcherPanel);
        app.Page = Page;
        var PageCoordinator = (function (_super) {
            __extends(PageCoordinator, _super);
            function PageCoordinator(opc) {
                var _this = this;
                _super.call(this, null, { tag: 'div', class: 'mz-page-coordinator' }, [], this, this, undefined);
                this.loadingPage = true;
                this.pages = new mz.Collection(null, { key: "name" });
                if (!opc.pages) {
                    throw new Error("You must provide 'pages: Url(.json) | Array[]' option.");
                }
                if (typeof opc.pages == "string") {
                    mz.xr.get(opc.pages).then(function (x) { return _this.setPages(x.data); });
                }
                else if (opc.pages instanceof Array) {
                    this.setPages(opc.pages);
                }
                else {
                    throw new TypeError("opc.pages must be an Array or Url(.json)");
                }
                if (opc.templateSelector)
                    $(function () {
                        var frag = document.createElement("app");
                        var elem = document.querySelector(opc.templateSelector || "body *");
                        if (!elem) {
                            console.error("PageCoordinator: Target not fund!. Selector: " + opc.templateSelector || "body *");
                            return;
                        }
                        var parentNode = frag.parentNode;
                        if (parentNode && elem && _this.rootNode && elem != _this.rootNode) {
                            mz.dom.adapter.replaceChild(parentNode, _this.rootNode, elem);
                            frag.appendChild(elem);
                            _this.startComponent(frag);
                        }
                        else {
                            frag.appendChild(elem);
                            _this.startComponent(frag);
                            _this.appendTo("body");
                        }
                    });
                else
                    $(function () {
                        _this.appendTo("body");
                    });
                $(window).on('resize', function () { return _this.resize(); });
                // phonegap!
                document.addEventListener("resetScrollView", function () {
                    _this.resize();
                });
            }
            PageCoordinator.prototype.setPages = function (pages) {
                var _this = this;
                var routes = {};
                var bindRoutes = {};
                this.pages.clear();
                for (var _i = 0; _i < pages.length; _i++) {
                    var page = pages[_i];
                    if (page.routes) {
                        for (var route_1 in page.routes) {
                            var action_name = page.routes[route_1];
                            if (typeof action_name !== "string") {
                                console.error("invalid action name for route " + page.name + "[" + route_1 + "], type of action must be a string value instead is: ", action_name);
                                continue;
                            }
                            if (route_1 in bindRoutes)
                                console.warn("Route " + route_1 + " duplicated.");
                            if ('routes' === action_name) {
                                console.error('PageCoordinator: Action name "routes" not allowed');
                                continue;
                            }
                            routes[action_name] = {
                                page: page,
                                route: route_1,
                                name: action_name
                            };
                            bindRoutes[route_1] = action_name;
                        }
                    }
                    this.pages.push(page);
                }
                var routerParam = {
                    routes: bindRoutes
                };
                var that = this;
                for (var i in routes) {
                    (function (route) {
                        routerParam[route.name] = function () {
                            var t = arguments;
                            that.loadingPage = true;
                            that.getPage(route.page.name).then(function (modulo) {
                                if (modulo.routeHandler && route.name in modulo.routeHandler) {
                                    modulo.routeHandler[route.name].apply(modulo, t);
                                }
                                modulo.handleRoute.apply(modulo, [route.name].concat(t));
                                that.show(modulo);
                                that.emit.apply(that, ['route', route.name].concat(t));
                                that.emit('history', Backbone.history.getFragment());
                                that.loadingPage = false;
                            });
                        };
                    })(routes[i]);
                }
                ;
                mz.route.start(routerParam, function () {
                    _this.emit('loaded');
                    _this.loadingPage = false;
                    _this.loaded();
                });
            };
            PageCoordinator.prototype.loaded = function () {
            };
            PageCoordinator.prototype.updatePageTitle = function () {
                if (this.actualPage) {
                    if (this.actualPage.windowTitle)
                        mz.dom.adapter.setTitle(this.actualPage.windowTitle);
                }
            };
            PageCoordinator.prototype.actualPage_changed = function (page) {
                this.updatePageTitle();
            };
            PageCoordinator.prototype.show = function (page) {
                if (page instanceof Page) {
                    _super.prototype.show.call(this, page);
                    this.actualPage = page;
                    this.actualPageName = page.pageControllerName;
                }
                else
                    throw new Error("App only shows instances of Page");
            };
            PageCoordinator.prototype.navigate = function (route, trigger) {
                if (trigger === void 0) { trigger = true; }
                mz.route.navigate(route, trigger);
            };
            PageCoordinator.prototype.getPage = function (pageName) {
                var _this = this;
                var page = this.pages.indexedGet(pageName);
                if (page == null)
                    return Promise.reject(new Error("Page not found"));
                return new Promise(function (ok) {
                    mz.require(page.module, function (modulo) {
                        if (modulo.instance)
                            return ok(modulo.instance);
                        modulo.instance = new modulo(_this);
                        modulo.instance.parent = _this;
                        modulo.instance.pageControllerName = pageName;
                        ok(modulo.instance);
                    });
                });
            };
            __decorate([
                mz.MVCObject.proxy, 
                __metadata('design:type', Page)
            ], PageCoordinator.prototype, "actualPage", void 0);
            __decorate([
                mz.MVCObject.proxy, 
                __metadata('design:type', String)
            ], PageCoordinator.prototype, "actualPageName", void 0);
            __decorate([
                mz.MVCObject.proxy, 
                __metadata('design:type', Boolean)
            ], PageCoordinator.prototype, "loadingPage", void 0);
            PageCoordinator = __decorate([
                mz.Widget.ConfigureUnwrapped,
                mz.Widget.Template(null, 'content'), 
                __metadata('design:paramtypes', [Object])
            ], PageCoordinator);
            return PageCoordinator;
        })(mz.widgets.MzSwitcher);
        app.PageCoordinator = PageCoordinator;
    })(app = mz.app || (mz.app = {}));
})(mz || (mz = {}));
/// <reference path="../VIEW/Widget.ts" />
var mz;
(function (mz) {
    var redux;
    (function (redux) {
        var stateHelpers;
        (function (stateHelpers) {
            function cloneArray(array) {
                var newArray = new Array(array && array.length || 0);
                array && array.forEach(function (item, index) { return newArray[index] = item; });
                return newArray;
            }
            stateHelpers.cloneArray = cloneArray;
            function cloneArrayAndPush(array, element) {
                var newArray = cloneArray(array);
                newArray.push(element);
                return newArray;
            }
            stateHelpers.cloneArrayAndPush = cloneArrayAndPush;
            function cloneDeep(object) {
                return JSON.parse(JSON.stringify(object));
            }
            stateHelpers.cloneDeep = cloneDeep;
            function cloneShallow(object) {
                var target = {};
                for (var i in object) {
                    if (object.hasOwnProperty(i)) {
                        target[i] = object[i];
                    }
                }
                return target;
            }
            stateHelpers.cloneShallow = cloneShallow;
        })(stateHelpers = redux.stateHelpers || (redux.stateHelpers = {}));
        var ActionTypes;
        (function (ActionTypes) {
            ActionTypes.INIT = '@@redux/INIT';
        })(ActionTypes = redux.ActionTypes || (redux.ActionTypes = {}));
        redux.PropertyChangeOnValueMutation = function (target, propertyKey) {
            var prevProp = Reflect.getPropertyDescriptor(target, propertyKey);
            var newProp = {};
            if (prevProp && prevProp.get && prevProp.set) {
                newProp.get = prevProp.get;
                newProp.set = function (value) {
                    if (!shallowEqual(value, prevProp.get.call(this)))
                        prevProp.set.call(this, value);
                };
            }
            else if (!prevProp || prevProp.value) {
                var blackboxedValue = prevProp && prevProp.value;
                newProp.get = function () { return blackboxedValue; };
                newProp.set = function (value) {
                    if (!shallowEqual(value, blackboxedValue))
                        blackboxedValue = value;
                };
            }
            else {
                console.warn("@mz.redux.PropertyChangeOnValueMutation over " + propertyKey.toString() + " invalidated due malformed property", prevProp);
                return;
            }
            if (delete target[propertyKey])
                Object.defineProperty(target, propertyKey, newProp);
        };
        redux.PropertyChangeOnReferenceMutation = function (target, propertyKey) {
            var prevProp = Reflect.getPropertyDescriptor(target, propertyKey);
            var newProp = prevProp ? {
                writable: prevProp.writable,
                enumerable: prevProp.enumerable,
                configurable: prevProp.configurable
            } : {};
            if (prevProp && prevProp.get && prevProp.set) {
                newProp.get = prevProp.get;
                newProp.set = function (value) {
                    if (value === prevProp.get.call(this))
                        prevProp.set.call(this, value);
                };
            }
            else if (!prevProp || prevProp.value) {
                var blackboxedValue = prevProp && prevProp.value;
                newProp.get = function () { return blackboxedValue; };
                newProp.set = function (value) {
                    if (value !== blackboxedValue)
                        blackboxedValue = value;
                };
            }
            else {
                console.warn("@mz.redux.PropertyChangeOnReferenceMutation over " + propertyKey.toString() + " invalidated due malformed property ", prevProp);
                return;
            }
            Object.defineProperty(target, propertyKey, newProp);
        };
        function connectWidget(selector, store) {
            return function (target) {
                if (!store)
                    return console.error("redux store not found");
                target.prototype.redux_selector = selector;
                target.prototype.redux_store = store;
                target.prototype.unsubscribe_redux = function () { };
                var componentInitialized = target.prototype.componentInitialized;
                redux.PropertyChangeOnValueMutation(target.prototype, 'scope');
                target.prototype.componentInitialized = function () {
                    var that = this;
                    this.unsubscribe_redux = store.subscribe(function () {
                        try {
                            var newScope = selector(store.getState());
                            var oldScope = that.scope;
                            // check if we should update the widget's scope
                            // redux is not intended to use references, so we'll check the values
                            //if (!shallowEqual(oldScope, newScope)) replaced by -> PropertyChangeOnValueMutation
                            that.scope = newScope;
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                    try {
                        this.scope = selector(store.getState());
                    }
                    catch (e) {
                        console.error(e);
                    }
                    componentInitialized && componentInitialized.apply(this, arguments);
                };
                var unm = target.prototype.unmount;
                target.prototype.unmount = function () {
                    this.unsubscribe_redux();
                    unm && unm.apply(this, arguments);
                };
            };
        }
        redux.connectWidget = connectWidget;
        function wrapActionCreators(actionCreators) {
            return function (dispatch) { return bindActionCreators(actionCreators, dispatch); };
        }
        redux.wrapActionCreators = wrapActionCreators;
        function shallowEqual(objA, objB) {
            if (objA === objB) {
                return true;
            }
            var typeA = typeof objA;
            var typeB = typeof objB;
            if (typeA !== typeB)
                return false;
            if (typeA != 'object' || typeB != 'object')
                return objA == objB;
            if ((objA === null) != (objB === null))
                return false;
            var keysA = Object.keys(objA);
            var keysB = Object.keys(objB);
            if (keysA.length !== keysB.length) {
                return false;
            }
            // Test for A's keys different from B.
            var hasOwn = Object.prototype.hasOwnProperty;
            for (var i = 0; i < keysA.length; i++) {
                if (!hasOwn.call(objB, keysA[i]) ||
                    objA[keysA[i]] !== objB[keysA[i]]) {
                    return false;
                }
            }
            return true;
        }
        redux.shallowEqual = shallowEqual;
        function bindActionCreator(actionCreator, dispatch) {
            return (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return dispatch(actionCreator.apply(void 0, args));
            });
        }
        /**
         * Turns an object whose values are action creators, into an object with the
         * same keys, but with every function wrapped into a `dispatch` call so they
         * may be invoked directly. This is just a convenience method, as you can call
         * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
         *
         * For convenience, you can also pass a single function as the first argument,
         * and get a function in return.
         *
         * @param {Function|Object} actionCreators An object whose values are action
         * creator functions. One handy way to obtain it is to use ES6 `import * as`
         * syntax. You may also pass a single function.
         *
         * @param {Function} dispatch The `dispatch` function available on your Redux
         * store.
         *
         * @returns {Function|Object} The object mimicking the original object, but with
         * every action creator wrapped into the `dispatch` call. If you passed a
         * function as `actionCreators`, the return value will also be a single
         * function.
         */
        function bindActionCreators(actionCreators, dispatch) {
            if (typeof actionCreators === 'function') {
                return bindActionCreator(actionCreators, dispatch);
            }
            if (typeof actionCreators !== 'object' || actionCreators === null) {
                throw new Error(("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". ") +
                    "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
            }
            var keys = Object.keys(actionCreators);
            var boundActionCreators = {};
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var actionCreator = actionCreators[key];
                if (typeof actionCreator === 'function') {
                    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
                }
            }
            return boundActionCreators;
        }
        redux.bindActionCreators = bindActionCreators;
        /**
         * Creates a store enhancer that applies middleware to the dispatch method
         * of the Redux store. This is handy for a variety of tasks, such as expressing
         * asynchronous actions in a concise manner, or logging every action payload.
         *
         * See `redux-thunk` package as an example of the Redux middleware.
         *
         * Because middleware is potentially asynchronous, this should be the first
         * store enhancer in the composition chain.
         *
         * Note that each middleware will be given the `dispatch` and `getState` functions
         * as named arguments.
         *
         * @param {...Function} middlewares The middleware chain to be applied.
         * @returns {Function} A store enhancer applying the middleware.
         */
        function applyMiddleware() {
            var middlewares = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                middlewares[_i - 0] = arguments[_i];
            }
            return function (CreateStore) { return function (reducer, initialState, enhancer) {
                var store = CreateStore(reducer, initialState, enhancer);
                var dispatch = store.dispatch;
                var chain = [];
                var middlewareAPI = {
                    getState: store.getState,
                    dispatch: function (action) { return dispatch(action); }
                };
                chain = middlewares.map(function (middleware) { return middleware(middlewareAPI); });
                dispatch = compose.apply(void 0, chain)(store.dispatch);
                return mz.copy(store, {
                    dispatch: dispatch
                });
            }; };
        }
        redux.applyMiddleware = applyMiddleware;
        /**
         * Composes single-argument functions from right to left. The rightmost
         * function can take multiple arguments as it provides the signature for
         * the resulting composite function.
         *
         * @param {...Function} funcs The functions to compose.
         * @returns {Function} A function obtained by composing the argument functions
         * from right to left. For example, compose(f, g, h) is identical to doing
         * (...args) => f(g(h(...args))).
         */
        function compose() {
            var funcs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                funcs[_i - 0] = arguments[_i];
            }
            return (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (funcs.length === 0) {
                    return args[0];
                }
                var last = funcs[funcs.length - 1];
                var rest = funcs.slice(0, -1);
                return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
            });
        }
        redux.compose = compose;
        function createStore(reducer, initialState, enhancer) {
            if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
                enhancer = initialState;
                initialState = undefined;
            }
            if (typeof enhancer !== 'undefined') {
                if (typeof enhancer !== 'function') {
                    throw new Error('Expected the enhancer to be a function.');
                }
                return enhancer(createStore)(reducer, initialState);
            }
            if (typeof reducer !== 'function') {
                throw new Error('Expected the reducer to be a function.');
            }
            var currentReducer = reducer;
            var currentState = initialState;
            var currentListeners = [];
            var nextListeners = currentListeners;
            var isDispatching = false;
            function ensureCanMutateNextListeners() {
                if (nextListeners === currentListeners) {
                    nextListeners = currentListeners.slice();
                }
            }
            /**
             * Reads the state tree managed by the store.
             *
             * @returns {any} The current state tree of your application.
             */
            function getState() {
                return currentState;
            }
            /**
             * Adds a change listener. It will be called any time an action is dispatched,
             * and some part of the state tree may potentially have changed. You may then
             * call `getState()` to read the current state tree inside the callback.
             *
             * You may call `dispatch()` from a change listener, with the following
             * caveats:
             *
             * 1. The subscriptions are snapshotted just before every `dispatch()` call.
             * If you subscribe or unsubscribe while the listeners are being invoked, this
             * will not have any effect on the `dispatch()` that is currently in progress.
             * However, the next `dispatch()` call, whether nested or not, will use a more
             * recent snapshot of the subscription list.
             *
             * 2. The listener should not expect to see all states changes, as the state
             * might have been updated multiple times during a nested `dispatch()` before
             * the listener is called. It is, however, guaranteed that all subscribers
             * registered before the `dispatch()` started will be called with the latest
             * state by the time it exits.
             *
             * @param {Function} listener A callback to be invoked on every dispatch.
             * @returns {Function} A function to remove this change listener.
             */
            function subscribe(listener) {
                if (typeof listener !== 'function') {
                    throw new Error('Expected listener to be a function.');
                }
                var isSubscribed = true;
                ensureCanMutateNextListeners();
                nextListeners.push(listener);
                return function unsubscribe() {
                    if (!isSubscribed) {
                        return;
                    }
                    isSubscribed = false;
                    ensureCanMutateNextListeners();
                    var index = nextListeners.indexOf(listener);
                    nextListeners.splice(index, 1);
                };
            }
            /**
             * Dispatches an action. It is the only way to trigger a state change.
             *
             * The `reducer` function, used to create the store, will be called with the
             * current state tree and the given `action`. Its return value will
             * be considered the **next** state of the tree, and the change listeners
             * will be notified.
             *
             * The base implementation only supports plain object actions. If you want to
             * dispatch a Promise, an Observable, a thunk, or something else, you need to
             * wrap your store creating function into the corresponding middleware. For
             * example, see the documentation for the `redux-thunk` package. Even the
             * middleware will eventually dispatch plain object actions using this method.
             *
             * @param {Object} action A plain object representing “what changed”. It is
             * a good idea to keep actions serializable so you can record and replay user
             * sessions, or use the time travelling `redux-devtools`. An action must have
             * a `type` property which may not be `undefined`. It is a good idea to use
             * string constants for action types.
             *
             * @returns {Object} For convenience, the same action object you dispatched.
             *
             * Note that, if you use a custom middleware, it may wrap `dispatch()` to
             * return something else (for example, a Promise you can await).
             */
            function dispatch(action) {
                if (typeof action.type === 'undefined') {
                    throw new Error('Actions may not have an undefined "type" property. ' +
                        'Have you misspelled a constant?');
                }
                if (isDispatching) {
                    throw new Error('Reducers may not dispatch actions.');
                }
                try {
                    isDispatching = true;
                    currentState = currentReducer(currentState, action);
                }
                finally {
                    isDispatching = false;
                }
                var listeners = currentListeners = nextListeners;
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i]();
                }
                return action;
            }
            /**
             * Replaces the reducer currently used by the store to calculate the state.
             *
             * You might need this if your app implements code splitting and you want to
             * load some of the reducers dynamically. You might also need this if you
             * implement a hot reloading mechanism for Redux.
             *
             * @param {Function} nextReducer The reducer for the store to use instead.
             * @returns {void}
             */
            function replaceReducer(nextReducer) {
                if (typeof nextReducer !== 'function') {
                    throw new Error('Expected the nextReducer to be a function.');
                }
                currentReducer = nextReducer;
                dispatch({ type: ActionTypes.INIT });
            }
            // When a store is created, an "INIT" action is dispatched so that every
            // reducer returns their initial state. This effectively populates
            // the initial state tree.
            dispatch({ type: ActionTypes.INIT });
            return {
                dispatch: dispatch,
                subscribe: subscribe,
                getState: getState,
                replaceReducer: replaceReducer
            };
        }
        redux.createStore = createStore;
        function getUndefinedStateErrorMessage(key, action) {
            var actionType = action && action.type;
            var actionName = actionType && "\"" + actionType.toString() + "\"" || 'an action';
            return (("Given action " + actionName + ", reducer \"" + key + "\" returned undefined. ") +
                "To ignore an action, you must explicitly return the previous state.");
        }
        function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
            var reducerKeys = Object.keys(reducers);
            var argumentName = action && action.type === ActionTypes.INIT ?
                'initialState argument passed to createStore' :
                'previous state received by the reducer';
            if (reducerKeys.length === 0) {
                return ('Store does not have a valid reducer. Make sure the argument passed ' +
                    'to combineReducers is an object whose values are reducers.');
            }
            var unexpectedKeys = Object.keys(inputState).filter(function (key) { return !reducers.hasOwnProperty(key); });
            if (unexpectedKeys.length > 0) {
                return (("Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " ") +
                    ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") +
                    "Expected to find one of the known reducer keys instead: " +
                    ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored."));
            }
        }
        function assertReducerSanity(reducers) {
            Object.keys(reducers).forEach(function (key) {
                var reducer = reducers[key];
                var initialState = reducer(undefined, { type: ActionTypes.INIT });
                if (typeof initialState === 'undefined') {
                    throw new Error(("Reducer \"" + key + "\" returned undefined during initialization. ") +
                        "If the state passed to the reducer is undefined, you must " +
                        "explicitly return the initial state. The initial state may " +
                        "not be undefined.");
                }
                var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
                if (typeof reducer(undefined, { type: type }) === 'undefined') {
                    throw new Error(("Reducer \"" + key + "\" returned undefined when probed with a random type. ") +
                        ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") +
                        "namespace. They are considered private. Instead, you must return the " +
                        "current state for any unknown actions, unless it is undefined, " +
                        "in which case you must return the initial state, regardless of the " +
                        "action type. The initial state may not be undefined.");
                }
            });
        }
        /**
         * Turns an object whose values are different reducer functions, into a single
         * reducer function. It will call every child reducer, and gather their results
         * into a single state object, whose keys correspond to the keys of the passed
         * reducer functions.
         *
         * @param {Object} reducers An object whose values correspond to different
         * reducer functions that need to be combined into one. One handy way to obtain
         * it is to use ES6 `import * as reducers` syntax. The reducers may never return
         * undefined for any action. Instead, they should return their initial state
         * if the state passed to them was undefined, and the current state for any
         * unrecognized action.
         *
         * @returns {Function} A reducer function that invokes every reducer inside the
         * passed object, and builds a state object with the same shape.
         */
        function combineReducers(reducers) {
            var reducerKeys = Object.keys(reducers);
            var finalReducers = {};
            for (var i = 0; i < reducerKeys.length; i++) {
                var key = reducerKeys[i];
                if (typeof reducers[key] === 'function') {
                    finalReducers[key] = reducers[key];
                }
            }
            var finalReducerKeys = Object.keys(finalReducers);
            var sanityError;
            try {
                assertReducerSanity(finalReducers);
            }
            catch (e) {
                sanityError = e;
            }
            return function combination(state, action) {
                if (state === void 0) { state = {}; }
                if (sanityError) {
                    throw sanityError;
                }
                var hasChanged = false;
                var nextState = {};
                for (var i = 0; i < finalReducerKeys.length; i++) {
                    var key = finalReducerKeys[i];
                    var reducer = finalReducers[key];
                    var previousStateForKey = state[key];
                    var nextStateForKey = reducer(previousStateForKey, action);
                    if (typeof nextStateForKey === 'undefined') {
                        var errorMessage = getUndefinedStateErrorMessage(key, action);
                        throw new Error(errorMessage);
                    }
                    nextState[key] = nextStateForKey;
                    hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                }
                return hasChanged ? nextState : state;
            };
        }
        redux.combineReducers = combineReducers;
        function makeFilter(filter) {
            // function filter
            if (typeof filter === 'function')
                return filter;
            // object filter, match properties
            if (typeof filter === 'object')
                return function (data) {
                    if (typeof data !== 'object')
                        return false;
                    for (var n in filter)
                        if (filter[n] !== data[n])
                            return false;
                    return true;
                };
            // value filter, equal data or equal type property
            return function (data) {
                if (data && typeof data === 'object')
                    return data.type === filter;
                return data === filter;
            };
        }
        // https://github.com/ajlopez/ReduMan
        function createManager() {
            var steps = [];
            var owfn = null;
            var when = function (filter, fn) {
                steps.push({ filter: makeFilter(filter), fn: fn });
                return reducer;
            };
            var otherwise = function (fn) {
                owfn = fn;
                return reducer;
            };
            var use = function (fn) {
                steps.push({ fn: fn });
                return reducer;
            };
            var reducer = function (state, action) {
                var l = steps.length;
                var currentState = state;
                var processed = false;
                for (var k = 0; k < l; k++) {
                    var step = steps[k];
                    if (!step.filter || step.filter(action)) {
                        var newState = step.fn(currentState, action);
                        if (typeof newState === 'undefined') {
                            var errorMessage = getUndefinedStateErrorMessage(k, action);
                            console.error(step);
                            throw new Error(errorMessage);
                        }
                        if (newState !== currentState)
                            processed = true;
                        currentState = newState;
                    }
                }
                if (owfn && !processed)
                    return owfn(currentState, action);
                return currentState;
            };
            reducer.when = when;
            reducer.otherwise = otherwise;
            reducer.use = use;
            return reducer;
        }
        redux.createManager = createManager;
    })(redux = mz.redux || (mz.redux = {}));
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
var mz;
(function (mz) {
    var auth;
    (function (auth) {
        var jwt;
        (function (jwt) {
            function urlBase64Decode(str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: {
                        break;
                    }
                    case 2: {
                        output += '==';
                        break;
                    }
                    case 3: {
                        output += '=';
                        break;
                    }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }
                return mz.globalContext.decodeURIComponent(mz.globalContext.escape(mz.globalContext.atob(output))); //polyfill https://github.com/davidchambers/Base64.js
            }
            jwt.urlBase64Decode = urlBase64Decode;
            function decodeToken(token) {
                var parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('JWT must have 3 parts');
                }
                var decoded = urlBase64Decode(parts[1]);
                if (!decoded) {
                    throw new Error('Cannot decode the token');
                }
                return JSON.parse(decoded);
            }
            jwt.decodeToken = decodeToken;
            function getTokenExpirationDate(token) {
                var decoded = decodeToken(token);
                if (typeof decoded.exp === "undefined") {
                    return null;
                }
                var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
                d.setUTCSeconds(decoded.exp);
                return d;
            }
            jwt.getTokenExpirationDate = getTokenExpirationDate;
            ;
            function isTokenExpired(token, offsetSeconds) {
                var d = getTokenExpirationDate(token);
                offsetSeconds = offsetSeconds || 0;
                if (d === null) {
                    return false;
                }
                // Token expired?
                return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
            }
            jwt.isTokenExpired = isTokenExpired;
            ;
        })(jwt = auth.jwt || (auth.jwt = {}));
    })(auth = mz.auth || (mz.auth = {}));
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
var mz;
(function (mz) {
    var mzLang = mz.mzLang || {};
    var idioma = mz.globalContext.idioma = mz.globalContext.idioma || {};
    var erroresEncontradosIdioma = {};
    mz.translate = function (claveIdioma, defaultValue) {
        if (!(claveIdioma in idioma)) {
            if (claveIdioma in mzLang)
                return idioma[claveIdioma] = mzLang[claveIdioma];
            if (!(claveIdioma in erroresEncontradosIdioma)) {
                mz._debug && console.warn('ñ: ' + claveIdioma, defaultValue);
                erroresEncontradosIdioma[claveIdioma] = defaultValue || claveIdioma;
                idioma[claveIdioma] = defaultValue || claveIdioma;
            }
        }
        return idioma[claveIdioma];
    };
    mz.translate.faltantes = erroresEncontradosIdioma;
    mz.translate.idioma = idioma;
    mz.globalContext["ñ"] = mz.translate;
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
/// <reference path="I18n.ts" />
/// <reference path="Xr.ts" />
Date.prototype.add = function (sInterval, iNum) {
    var dTemp = this;
    if (!sInterval || iNum == 0)
        return dTemp;
    switch (sInterval.toLowerCase()) {
        case "ms":
            dTemp.setMilliseconds(dTemp.getMilliseconds() + iNum);
            break;
        case "s":
        case "ss":
            dTemp.setSeconds(dTemp.getSeconds() + iNum);
            break;
        case "mi":
        case "m":
        case "mm":
            dTemp.setMinutes(dTemp.getMinutes() + iNum);
            break;
        case "h":
        case "hh":
            dTemp.setHours(dTemp.getHours() + iNum);
            break;
        case "d":
        case "dd":
            dTemp.setDate(dTemp.getDate() + iNum);
            break;
        case "mo":
            dTemp.setMonth(dTemp.getMonth() + iNum);
            break;
        case "y":
        case "yyyy":
            dTemp.setFullYear(dTemp.getFullYear() + iNum);
            break;
    }
    return dTemp;
};
Date.prototype.part = function (sInterval) {
    var dTemp = this;
    if (!sInterval)
        return dTemp;
    switch (sInterval.toLowerCase()) {
        case "ms":
            return ('0000' + (dTemp.getMilliseconds().toString())).substr(-4);
        case "s":
        case "ss":
            return ('00' + (dTemp.getSeconds()).toString()).substr(-2);
        case "mi":
        case "m":
        case "mm":
            return ('00' + (dTemp.getMinutes()).toString()).substr(-2);
        case "h":
        case "hh":
            return ('00' + (dTemp.getHours()).toString()).substr(-2);
        case "d":
        case "dd":
            return ('00' + (dTemp.getDate()).toString()).substr(-2);
        case "mo":
            return ('00' + (dTemp.getMonth() + 1).toString()).substr(-2);
        case "y":
        case "yyyy":
            return dTemp.getFullYear().toString();
    }
    return sInterval;
};
var mz;
(function (mz) {
    var date;
    (function (date_1) {
        var regexpISO8601 = /^[0-9]{4}(.{1})[0-9]{1,2}\1[0-9]{1,2}\T/;
        function parseObject(json) {
            if (typeof json == "object") {
                var out;
                if (json instanceof Array)
                    out = [];
                else
                    out = {};
                for (var i in json) {
                    if (typeof json[i] == "string") {
                        if (json[i].substr(0, 6) === "/Date(" && json[i].substr(-2) === ")/") {
                            out[i] = parse(json[i]);
                        }
                        else if (json[i].substr(10, 1) === "T" && (json[i].length < 32) && regexpISO8601.test(json[i])) {
                            var a = new Date(json[i]);
                            if (!isNaN(a))
                                out[i] = a;
                            else
                                out[i] = json[i];
                        }
                        else {
                            out[i] = json[i];
                        }
                    }
                    else {
                        if (mz.isIterable(json[i])) {
                            out[i] = parseObject(json[i]);
                        }
                        else {
                            out[i] = json[i];
                        }
                    }
                }
                return out;
            }
            return json;
        }
        date_1.parseObject = parseObject;
        /**
        * An Array of day names starting with Sunday.
        *
        * @example dayNames[0]
        * @result 'Sunday'
        *
        * @name dayNames
        * @type Array
        * @cat Plugins/Methods/Date
        */
        date_1.dayNames = mz.translate('#dayNames', 'Domingo|Lunes|Martes|Miercoles|Jueves|Viernes|Sabado').split('|');
        /**
        * An Array of abbreviated day names starting with Sun.
        *
        * @example abbrDayNames[0]
        * @result 'Sun'
        *
        * @name abbrDayNames
        * @type Array
        * @cat Plugins/Methods/Date
        */
        date_1.abbrDayNames = mz.translate('#abbrDayNames', 'Dom|Lun|Mar|Mie|Jue|Vie|Sab').split('|');
        /**
        * An Array of month names starting with Janurary.
        *
        * @example monthNames[0]
        * @result 'January'
        *
        * @name monthNames
        * @type Array
        * @cat Plugins/Methods/Date
        */
        date_1.monthNames = mz.translate('#monthNames', 'Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre').split('|');
        /**
        * An Array of abbreviated month names starting with Jan.
        *
        * @example abbrMonthNames[0]
        * @result 'Jan'
        *
        * @name monthNames
        * @type Array
        * @cat Plugins/Methods/Date
        */
        date_1.abbrMonthNames = mz.translate('#abbrMonthNames', 'Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic').split('|');
        /**
        * The first day of the week for this locale.
        *
        * @name firstDayOfWeek
        * @type Number
        * @cat Plugins/Methods/Date
        * @author Kelvin Luck
        */
        date_1.firstDayOfWeek = 0;
        /**
        * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
        *
        * @name format
        * @type String
        * @cat Plugins/Methods/Date
        * @author Kelvin Luck
        */
        date_1.format = mz.translate('#DateFormat', 'dd/mm/yyyy');
        //Date.format = 'mm/dd/yyyy';
        //Date.format = 'yyyy-mm-dd';
        //Date.format = 'dd mmm yy';
        /**
        * The first two numbers in the century to be used when decoding a two digit year. Since a two digit year is ambiguous (and date.setYear
        * only works with numbers < 99 and so doesn't allow you to set years after 2000) we need to use this to disambiguate the two digit year codes.
        *
        * @name format
        * @type String
        * @cat Plugins/Methods/Date
        * @author Kelvin Luck
        */
        date_1.fullYearStart = '20';
        /**
        * Adds a given method under the given name
        * to the Date prototype if it doesn't
        * currently exist.
        *
        * @private
        */
        function addFeature(name, method) {
            if (!Date.prototype[name]) {
                Date.prototype[name] = method;
            }
        }
        ;
        /**
        * Checks if the year is a leap year.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.isLeapYear();
        * @result true
        *
        * @name isLeapYear
        * @type Boolean
        * @cat Plugins/Methods/Date
        */
        addFeature("isLeapYear", function () {
            var y = this.getFullYear();
            return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
        });
        /**
        * Checks if the day is a weekend day (Sat or Sun).
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.isWeekend();
        * @result false
        *
        * @name isWeekend
        * @type Boolean
        * @cat Plugins/Methods/Date
        */
        addFeature("isWeekend", function () {
            return this.getDay() == 0 || this.getDay() == 6;
        });
        /**
        * Check if the day is a day of the week (Mon-Fri)
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.isWeekDay();
        * @result false
        *
        * @name isWeekDay
        * @type Boolean
        * @cat Plugins/Methods/Date
        */
        addFeature("isWeekDay", function () {
            return !this.isWeekend();
        });
        /**
        * Gets the number of days in the month.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getDaysInMonth();
        * @result 31
        *
        * @name getDaysInMonth
        * @type Number
        * @cat Plugins/Methods/Date
        */
        addFeature("getDaysInMonth", function () {
            return [31, (this.isLeapYear() ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.getMonth()];
        });
        /**
        * Gets the name of the day.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getDayName();
        * @result 'Saturday'
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getDayName(true);
        * @result 'Sat'
        *
        * @param abbreviated Boolean When set to true the name will be abbreviated.
        * @name getDayName
        * @type String
        * @cat Plugins/Methods/Date
        */
        addFeature("getDayName", function (abbreviated) {
            return abbreviated ? mz.date.abbrDayNames[this.getDay()] : mz.date.dayNames[this.getDay()];
        });
        /**
        * Gets the name of the month.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getMonthName();
        * @result 'Janurary'
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getMonthName(true);
        * @result 'Jan'
        *
        * @param abbreviated Boolean When set to true the name will be abbreviated.
        * @name getDayName
        * @type String
        * @cat Plugins/Methods/Date
        */
        addFeature("getMonthName", function (abbreviated) {
            return abbreviated ? mz.date.abbrMonthNames[this.getMonth()] : mz.date.monthNames[this.getMonth()];
        });
        /**
        * Get the number of the day of the year.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getDayOfYear();
        * @result 11
        *
        * @name getDayOfYear
        * @type Number
        * @cat Plugins/Methods/Date
        */
        addFeature("getDayOfYear", function () {
            var tmpdtm = new Date("1/1/" + this.getFullYear());
            return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
        });
        /**
        * Get the number of the week of the year.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.getWeekOfYear();
        * @result 2
        *
        * @name getWeekOfYear
        * @type Number
        * @cat Plugins/Methods/Date
        */
        addFeature("getWeekOfYear", function () {
            return Math.ceil(this.getDayOfYear() / 7);
        });
        /**
        * Set the day of the year.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.setDayOfYear(1);
        * dtm.toString();
        * @result 'Tue Jan 01 2008 00:00:00'
        *
        * @name setDayOfYear
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("setDayOfYear", function (day) {
            this.setMonth(0);
            this.setDate(day);
            return this;
        });
        /**
        * Add a number of years to the date object.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.addYears(1);
        * dtm.toString();
        * @result 'Mon Jan 12 2009 00:00:00'
        *
        * @name addYears
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("addYears", function (num) {
            this.setFullYear(this.getFullYear() + num);
            return this;
        });
        /**
        * Add a number of months to the date object.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.addMonths(1);
        * dtm.toString();
        * @result 'Tue Feb 12 2008 00:00:00'
        *
        * @name addMonths
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("addMonths", function (num) {
            var tmpdtm = this.getDate();
            this.setMonth(this.getMonth() + num);
            if (tmpdtm > this.getDate())
                this.addDays(-this.getDate());
            return this;
        });
        /**
        * Add a number of days to the date object.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.addDays(1);
        * dtm.toString();
        * @result 'Sun Jan 13 2008 00:00:00'
        *
        * @name addDays
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("addDays", function (num) {
            //this.setDate(this.getDate() + num);
            this.setTime(this.getTime() + (num * 86400000));
            return this;
        });
        /**
        * Add a number of hours to the date object.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.addHours(24);
        * dtm.toString();
        * @result 'Sun Jan 13 2008 00:00:00'
        *
        * @name addHours
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("addHours", function (num) {
            this.setHours(this.getHours() + num);
            return this;
        });
        /**
        * Add a number of minutes to the date object.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.addMinutes(60);
        * dtm.toString();
        * @result 'Sat Jan 12 2008 01:00:00'
        *
        * @name addMinutes
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("addMinutes", function (num) {
            this.setMinutes(this.getMinutes() + num);
            return this;
        });
        /**
        * Add a number of seconds to the date object.
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.addSeconds(60);
        * dtm.toString();
        * @result 'Sat Jan 12 2008 00:01:00'
        *
        * @name addSeconds
        * @type Date
        * @cat Plugins/Methods/Date
        */
        addFeature("addSeconds", function (num) {
            this.setSeconds(this.getSeconds() + num);
            return this;
        });
        /**
        * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
        *
        * @example var dtm = new Date();
        * dtm.zeroTime();
        * dtm.toString();
        * @result 'Sat Jan 12 2008 00:01:00'
        *
        * @name zeroTime
        * @type Date
        * @cat Plugins/Methods/Date
        * @author Kelvin Luck
        */
        addFeature("zeroTime", function () {
            this.setMilliseconds(0);
            this.setSeconds(0);
            this.setMinutes(0);
            this.setHours(0);
            return this;
        });
        /**
        * Returns a string representation of the date object according to Date.format.
        * (Date.toString may be used in other places so I purposefully didn't overwrite it)
        *
        * @example var dtm = new Date("01/12/2008");
        * dtm.asString();
        * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
        *
        * @name asString
        * @type Date
        * @cat Plugins/Methods/Date
        * @author Kelvin Luck
        */
        addFeature("asString", function (format) {
            var r = format || mz.date.format;
            if (r.split('mm').length > 1) {
                r = r.split('mmmm').join(this.getMonthName(false))
                    .split('mmm').join(this.getMonthName(true))
                    .split('mm').join(_zeroPad(this.getMonth() + 1));
            }
            else {
                r = r.split('m').join(this.getMonth() + 1);
            }
            r = r.split('yyyy').join(this.getFullYear())
                .split('yy').join((this.getFullYear() + '').substring(2))
                .split('dd').join(_zeroPad(this.getDate()))
                .split('d').join(this.getDate());
            return r;
        });
        /**
        * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
        * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
        *
        * @example var dtm = Date.fromString("12/01/2008");
        * dtm.toString();
        * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
        *
        * @name fromString
        * @type Date
        * @cat Plugins/Methods/Date
        * @author Kelvin Luck
        */
        function fromString(s, f) {
            f = f || date_1.format;
            f.replace('mo', 'mm');
            var d = new Date('01/01/1970');
            if (s == '')
                return d;
            s = s.toLowerCase();
            var matcher = '';
            var order = [];
            var r = /(dd?d?|mm?m?|yy?yy?)+([^(m|d|y)])?/g;
            var results;
            while ((results = r.exec(f)) != null) {
                switch (results[1]) {
                    case 'd':
                    case 'dd':
                    case 'm':
                    case 'mm':
                    case 'yy':
                    case 'yyyy':
                        matcher += '(\\d+\\d?\\d?\\d?)+';
                        order.push(results[1].substr(0, 1));
                        break;
                    case 'mmm':
                        matcher += '([a-z]{3})';
                        order.push('M');
                        break;
                }
                if (results[2]) {
                    matcher += results[2];
                }
            }
            var dm = new RegExp(matcher);
            var result = s.match(dm);
            if (!result)
                return d;
            for (var i = 0; i < order.length; i++) {
                var res = result[i + 1];
                switch (order[i]) {
                    case 'd':
                        d.setDate(res);
                        break;
                    case 'm':
                        d.setMonth(Number(res) - 1);
                        break;
                    case 'M':
                        for (var j = 0; j < date_1.abbrMonthNames.length; j++) {
                            if (date_1.abbrMonthNames[j].toLowerCase() == res)
                                break;
                        }
                        d.setMonth(j);
                        break;
                    case 'y':
                        d.setFullYear(res);
                        break;
                }
            }
            return d;
        }
        date_1.fromString = fromString;
        ;
        // utility method
        var _zeroPad = function (num) {
            var s = '0' + num;
            return s.substring(s.length - 2);
            //return ('0'+num).substring(-2); // doesn't work on IE :(
        };
        date_1._offsetServer = 0;
        function newSyncro() {
            var date = new Date();
            date.setTime(date.getTime() + date_1._offsetServer);
            return date;
        }
        date_1.newSyncro = newSyncro;
        function sync(url) {
            mz.xr.get(url).then(function (x) {
                var xhr = x.xhr;
                var date = xhr.getResponseHeader("Date") || xhr.getResponseHeader("date");
                var serverTimeMillisGMT = Date.parse(new Date(Date.parse(date)).toUTCString());
                var localMillisUTC = Date.parse(new Date().toUTCString());
                date_1._offsetServer = serverTimeMillisGMT - localMillisUTC;
                if (mz._debug) {
                    console.log('Timer sincronizados con el servidor: offset=' + date_1._offsetServer);
                    console.log('Timer local:', new Date());
                    console.log('Timer remoto:', newSyncro());
                }
            });
        }
        date_1.sync = sync;
        function parse(date, format) {
            function parseJsonDate(d) {
                if (!d)
                    return null;
                if (d instanceof Date)
                    return new Date(d);
                //return eval("new " + d.substr(1).replace("/",""));
                if (d.indexOf("/Date(") == 0 && d.lastIndexOf("/") == (d.length - 1))
                    return new Date(mz.intval(d.substr(6)));
                return new Date(d);
            }
            function convertirAFechaHora(s) {
                if (s instanceof Date)
                    return s;
                var date = null;
                if (s.match(/^\d{4}([./-])\d{1,2}\1\d{1,2}[ ]\d{1,2}:\d{1,2}/)) {
                    date = new Date(s);
                }
                else if (format && s.match(/^\d{2}([./-])\d{2}\1\d{4}[ ]\d{2}:\d{2}/) && format.startsWith('dd')) {
                    var mes = s.substring(3, 5);
                    var dia = s.substring(0, 2);
                    var anio = s.substring(6, 10);
                    if (mes > 12) {
                        var a = dia;
                        dia = mes;
                        mes = a;
                    }
                    var hora = s.substring(11, 13);
                    var min = s.substring(14, 16);
                    date = new Date(mes + "/" + dia + "/" + anio + " " + hora + ":" + min);
                }
                else if (s.match(/^\d{2}([./-])\d{2}\1\d{4}[ ]\d{2}:\d{2}/)) {
                    var mes = s.substring(3, 5);
                    var dia = s.substring(0, 2);
                    var anio = s.substring(6, 10);
                    if (mes > 12) {
                        var a = dia;
                        dia = mes;
                        mes = a;
                    }
                    var hora = s.substring(11, 13);
                    var min = s.substring(14, 16);
                    date = new Date(mes + "/" + dia + "/" + anio + " " + hora + ":" + min);
                }
                else {
                    var tmp = new Date(date);
                    if (!isNaN(tmp))
                        date = tmp;
                }
                return date;
            }
            function convertirAFecha(s) {
                if (s instanceof Date)
                    return s;
                var date = null;
                if (s.match(/^\d{4}([./-])\d{1,2}\1\d{1,2}/)) {
                    date = new Date(s);
                }
                else if (s.match(/^\d{2}([./-])\d{2}\1\d{4}/) && format && (format.startsWith('mm') || format.startsWith('mo'))) {
                    var dia = s.substring(3, 5);
                    var mes = s.substring(0, 2);
                    var anio = s.substring(6, 10);
                    if (mes > 12) {
                        var a = dia;
                        dia = mes;
                        mes = a;
                    }
                    date = new Date(anio, mes, dia);
                }
                else if (s.match(/^\d{2}([./-])\d{2}\1\d{4}/)) {
                    var mes = s.substring(3, 5);
                    var dia = s.substring(0, 2);
                    var anio = s.substring(6, 10);
                    if (mes > 12) {
                        var a = dia;
                        dia = mes;
                        mes = a;
                    }
                    date = new Date(anio, mes, dia);
                }
                else {
                    var tmp = new Date(date);
                    if (!isNaN(tmp))
                        date = tmp;
                }
                return date;
            }
            if (date == null)
                return null;
            if (date instanceof Date)
                return date;
            if (typeof date === 'string') {
                date = mz.trim(date);
                if (date.indexOf("/Date(") == 0 && date.lastIndexOf("/") == (date.length - 1)) {
                    return parseJsonDate(date);
                }
                else if (date.indexOf("T") == 10 && date.lastIndexOf("Z") == (date.length - 1)) {
                    var a = new Date(date);
                    if (!isNaN(a))
                        return a;
                }
                else if (date.indexOf("UTC") != -1) {
                    date = date.replace(/-/, "/").replace(/-/, "/");
                    date = date.replace(/T/, " ").replace(/Z/, " UTC");
                    date = date.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
                    return new Date(date);
                }
                else if (date.indexOf("/") != -1) {
                    if (date.indexOf(":") != -1) {
                        return convertirAFechaHora(date);
                    }
                    return convertirAFecha(date);
                }
                else {
                    return new Date(date);
                }
            }
            else if (typeof date == "number") {
                return new Date(date);
            }
            return date;
        }
        date_1.parse = parse;
        function add(date, intervalo, numero) {
            return this.parse(date).add(intervalo, numero);
        }
        date_1.add = add;
        function fmt_date(obj_date) {
            if (obj_date === null)
                return '';
            if (!(obj_date instanceof Date)) {
                obj_date = this.parse(obj_date);
            }
            if (!(obj_date instanceof Date)) {
                return '';
            }
            if ('asString' in obj_date)
                return obj_date.asString();
            var d = obj_date.getDate();
            var m = obj_date.getMonth() + 1;
            var a = obj_date.getFullYear();
            if (m < 10)
                m = "0" + m.toString();
            if (d < 10)
                d = "0" + d.toString();
            return a.toString() + '/' + m.toString() + '/' + d.toString();
        }
        date_1.fmt_date = fmt_date;
        function fmt_time(obj_date, segundos) {
            if (obj_date === null)
                return '';
            if (!(obj_date instanceof Date)) {
                obj_date = this.parse(obj_date);
            }
            if (!(obj_date instanceof Date)) {
                return '';
            }
            var hr = obj_date.getHours();
            var min = obj_date.getMinutes();
            var seg = obj_date.getSeconds();
            if (min < 10)
                min = "0" + min.toString();
            if (hr < 10)
                hr = "0" + hr.toString();
            if (seg < 10)
                seg = "0" + seg.toString();
            segundos = segundos || false;
            return hr.toString() + ':' + min.toString() + (segundos != false ? ":" + seg.toString() : '');
        }
        date_1.fmt_time = fmt_time;
        function fmt_date_time(obj_date, segundos) {
            if (obj_date === null)
                return '';
            segundos = segundos || false;
            return this.fmt_date(obj_date) + ' ' + this.fmt_time(obj_date, segundos);
        }
        date_1.fmt_date_time = fmt_date_time;
        function toString(date, fmt) {
            if (date && date instanceof Date) {
                return (fmt || 'yyyy/mo/dd hh:mm').replace(/(\w{4}|\w{2}|\w{1})/g, function (a) {
                    return date.part(a);
                });
            }
            else {
                return '';
            }
        }
        date_1.toString = toString;
        function fmt_duracion(segundos, segs) {
            segundos = Number(segundos || 0);
            var negativo = segundos < 0;
            if (negativo)
                segundos = -segundos;
            var h = Math.floor(segundos / 3600);
            var m = Math.floor(segundos / 60 - h * 60);
            var s = Math.floor(segundos % 60);
            if (m < 10)
                m = "0" + m.toString();
            if (s < 10)
                s = "0" + s.toString();
            if (h < 10)
                h = "0" + h.toString();
            return (negativo ? '-' : '') + (segs ? "{0}:{1}:{2}" : "{0}:{1}").format(h, m, s);
        }
        date_1.fmt_duracion = fmt_duracion;
        function parseDuracion(val) {
            if (val == null || val instanceof Number)
                return val;
            if (typeof val == 'string' && val.indexOf(':') != -1) {
                var s = val.split(':');
                var hr = mz.intval(s[0]);
                return (hr < 0 ? -1 : 1) * Math.abs(hr) * 3600 + mz.intval(s[1]) * 60 + (s.length == 3 ? mz.intval(s[2]) : 0);
            }
            return mz.intval(val);
        }
        date_1.parseDuracion = parseDuracion;
    })(date = mz.date || (mz.date = {}));
})(mz || (mz = {}));
;
/// <reference path="../mz.ts" />
/// <reference path="Date.ts" />
var mz;
(function (mz) {
    var promise;
    (function (promise) {
        function wait(time) {
            return function (data) {
                return new Promise(function (ok) { return setTimeout(function () { return ok(data); }, time); });
            };
        }
        promise.wait = wait;
        ;
        function yield(data) {
            return new Promise(function (ok) { return setImmediate(function () { return ok(data); }); });
        }
        promise.yield = yield;
        ;
        function nextFrame(data) {
            return new Promise(function (ok) { return requestAnimationFrame(function () { return ok(data); }); });
        }
        promise.nextFrame = nextFrame;
        ;
        function parseStringDates(data) {
            var tipo = typeof data;
            if (!(tipo == "boolean" || tipo == "number" || tipo == "string"))
                return Promise.resolve(mz.date.parseObject(data));
            return Promise.resolve(data);
        }
        promise.parseStringDates = parseStringDates;
        ;
        if ('Response' in mz.globalContext && 'fetch' in mz.globalContext) {
            promise.parseJSON = function (data) {
                return (new mz.globalContext.Response(data)).json();
            };
        }
        else {
            promise.parseJSON = function (data) {
                var result;
                try {
                    result = JSON.parse(data);
                }
                catch (error) {
                    return Promise.reject(error);
                }
                return Promise.resolve(result);
            };
        }
    })(promise = mz.promise || (mz.promise = {}));
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
/// <reference path="Promise.ts" />
/// <reference path="../AUTH/OAuth2.ts" />
var mz;
(function (mz) {
    var res = function res(xhr) {
        return {
            status: xhr.status,
            response: xhr.response,
            xhr: xhr,
            url: '',
            data: null
        };
    };
    var getParams = function getParams(data, url) {
        var ret = [];
        for (var k in data) {
            ret.push('' + encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
        }
        if (url && url.split('?').length > 1)
            ret.push(url.split('?')[1]);
        return ret.join('&');
    };
    var promise = function promise(args, fn) {
        return (args && args.promise ? args.promise : xr.defaults.promise)(fn);
    };
    /**
      * xr (c) James Cleveland 2015
      * URL: https://github.com/radiosilence/xr
      * License: BSD
      */
    function xr(args) {
        if (!args.skipAuthorization && !args.promise) {
            mz.oauth2.applyAuthorizationHeaders(args);
        }
        return promise(args, function (resolve, reject) {
            var opts = mz.copy({}, xr.defaults);
            // avoid copying headers to default's headers object
            opts.headers = mz.copy(opts.headers);
            mz.copy(opts, args);
            var xhr = opts.xmlHttpRequest();
            var originalURL = opts.url;
            var fileProtocol = false;
            if (opts.url) {
                opts.url = mz.getPath(opts.url);
                fileProtocol = xr.urlResolve(opts.url).protocol == "file";
            }
            var data = typeof opts.data === 'object' && !opts.raw ? opts.dump.call(opts, opts.data) : opts.data;
            var queryString = opts.params ? getParams(opts.params) : null;
            xhr.open(opts.method, queryString && queryString.length ? '' + opts.url.split('?')[0] + '?' + queryString : opts.url, true);
            if (opts.url && opts.url.contains("//") && opts.withCredentials == null) {
                xhr.withCredentials = true;
            }
            else if (opts.withCredentials) {
                xhr.withCredentials = opts.withCredentials;
            }
            xhr.addEventListener(xr.Events.READY_STATE_CHANGE, function (e) {
                if (xhr.readyState == 4) {
                    try {
                        if (xhr.status >= 500 && xhr.getResponseHeader("jsonerror") == "true") {
                            var json = JSON.parse(xhr.responseText);
                            console.error ? console.error('JsonError: ' + json.Message, json) : console.log('JsonError: ' + json.Message, json);
                        }
                    }
                    catch (e) {
                    }
                    var resultado = mz.copy(res(xhr), {
                        data: xhr.response ? !opts.raw ? opts.load(xhr.response, xhr) : xhr.response : null,
                        url: originalURL
                    });
                    if (resultado.data && resultado.data instanceof Promise) {
                        resultado.data.then(function (ok) {
                            resultado.data = ok;
                            return (xhr.status == 0 && fileProtocol || xhr.status >= 200 && xhr.status < 300) ? resolve(resultado, false) : reject(resultado);
                        }, function (err) {
                            resultado.data = err;
                            return (xhr.status == 0 && fileProtocol || xhr.status >= 200 && xhr.status < 300) ? resolve(resultado, false) : reject(resultado);
                        });
                    }
                    else {
                        return (xhr.status == 0 && fileProtocol || xhr.status >= 200 && xhr.status < 300) ? resolve(resultado, false) : reject(resultado);
                    }
                }
            });
            xhr.addEventListener(xr.Events.ABORT, function () {
                return reject(res(xhr));
            });
            xhr.addEventListener(xr.Events.ERROR, function () {
                var resultado = res(xhr);
                if (xhr.response) {
                    try {
                        mz.copy(resultado, {
                            data: xhr.response ? !opts.raw ? opts.load(xhr.response, xhr) : xhr.response : null,
                            url: originalURL
                        });
                    }
                    catch (e) { }
                }
                return reject(resultado);
            });
            xhr.addEventListener(xr.Events.TIMEOUT, function () {
                return reject(res(xhr));
            });
            for (var header in opts.headers) {
                xhr.setRequestHeader(header, opts.headers[header]);
            }
            for (var _event in opts.events) {
                xhr.addEventListener(_event, opts.events[_event].bind(null, xhr), false);
            }
            data !== undefined ? xhr.send(data) : xhr.send();
        });
    }
    mz.xr = xr;
    ;
})(mz || (mz = {}));
var mz;
(function (mz) {
    var xr;
    (function (xr) {
        xr.Methods = {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE',
            PATCH: 'PATCH',
            OPTIONS: 'OPTIONS'
        };
        xr.Events = {
            READY_STATE_CHANGE: 'readystatechange',
            LOAD_START: 'loadstart',
            PROGRESS: 'progress',
            ABORT: 'abort',
            ERROR: 'error',
            LOAD: 'load',
            TIMEOUT: 'timeout',
            LOAD_END: 'loadend'
        };
        var readJSONFromString = function (x, xhr) {
            if (typeof x == "string") {
                return mz.promise.parseJSON(x).then(function (x) {
                    if ('d' in x)
                        return x.d;
                    return x;
                }).then(mz.promise.parseStringDates);
            }
            return x;
        };
        var formatters;
        (function (formatters) {
            formatters.json = function (x) {
                if (x instanceof FormData) {
                    if ('Content-Type' in this.headers)
                        delete this.headers['Content-Type'];
                    return x;
                }
                this.headers['Content-Type'] = 'application/json';
                return JSON.stringify(x);
            };
            formatters.raw = function (x) { return x.toString(); };
            formatters.urlEncoded = function (obj) {
                this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                var t = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i) && typeof obj[i] != 'undefined') {
                        if (typeof obj[i] == "object" && obj[i] instanceof Date && !isNaN(obj[i]))
                            t.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i].toISOString()));
                        else
                            t.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
                    }
                }
                return t.join("&");
            };
            formatters.multipart = function (obj) {
                if ('Content-Type' in this.headers)
                    delete this.headers['Content-Type'];
                var t = new FormData();
                for (var i in obj)
                    if (obj.hasOwnProperty(i))
                        t.append(i, obj[obj]);
                return t;
            };
        })(formatters = xr.formatters || (xr.formatters = {}));
        xr.defaults = {
            method: xr.Methods.GET,
            data: undefined,
            headers: {
                'Accept': 'application/json'
            },
            dump: formatters.json,
            load: readJSONFromString,
            xmlHttpRequest: function xmlHttpRequest() {
                return new XMLHttpRequest();
            },
            promise: function promise(fn) {
                return new Promise(fn);
            },
            params: {},
            url: null,
            raw: false,
            events: {},
            withCredentials: null
        };
        var urlParsingNode = document.createElement("a");
        var originUrl = urlResolve(location.href);
        /**
         *
         * Implementation Notes for non-IE browsers
         * ----------------------------------------
         * Assigning a URL to the href property of an anchor DOM node, even one attached to the DOM,
         * results both in the normalizing and parsing of the URL.  Normalizing means that a relative
         * URL will be resolved into an absolute URL in the context of the application document.
         * Parsing means that the anchor node's host, hostname, protocol, port, pathname and related
         * properties are all populated to reflect the normalized URL.  This approach has wide
         * compatibility - Safari 1+, Mozilla 1+, Opera 7+,e etc.  See
         * http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
         *
         * Implementation Notes for IE
         * ---------------------------
         * IE <= 10 normalizes the URL when assigned to the anchor node similar to the other
         * browsers.  However, the parsed components will not be set if the URL assigned did not specify
         * them.  (e.g. if you assign a.href = "foo", then a.protocol, a.host, etc. will be empty.)  We
         * work around that by performing the parsing in a 2nd step by taking a previously normalized
         * URL (e.g. by assigning to a.href) and assigning it a.href again.  This correctly populates the
         * properties such as protocol, hostname, port, etc.
         *
         * References:
         *   http://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
         *   http://www.aptana.com/reference/html/api/HTMLAnchorElement.html
         *   http://url.spec.whatwg.org/#urlutils
         *   https://github.com/angular/angular.js/pull/2902
         *   http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
         *
         * @kind function
         * @param {string} url The URL to be parsed.
         * @description Normalizes and parses a URL.
         * @returns {object} Returns the normalized URL as a dictionary.
         *
         *   | member name   | Description    |
         *   |---------------|----------------|
         *   | href          | A normalized version of the provided URL if it was not an absolute URL |
         *   | protocol      | The protocol including the trailing colon                              |
         *   | host          | The host and port (if the port is non-default) of the normalizedUrl    |
         *   | search        | The search params, minus the question mark                             |
         *   | hash          | The hash string, minus the hash symbol
         *   | hostname      | The hostname
         *   | port          | The port, without ":"
         *   | pathname      | The pathname, beginning with "/"
         *
         */
        function urlResolve(url) {
            var href = url;
            //if (msie) {
            // Normalize before parse.  Refer Implementation Notes on why this is
            // done in two steps on IE.
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
            //}
            urlParsingNode.setAttribute('href', href);
            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
                href: urlParsingNode.href,
                protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                host: urlParsingNode.host,
                search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                hostname: urlParsingNode.hostname,
                port: urlParsingNode.port,
                pathname: (urlParsingNode.pathname.charAt(0) === '/')
                    ? urlParsingNode.pathname
                    : '/' + urlParsingNode.pathname
            };
        }
        xr.urlResolve = urlResolve;
        /**
         * Parse a request URL and determine whether this is a same-origin request as the application document.
         *
         * @param {string|object} requestUrl The url of the request as a string that will be resolved
         * or a parsed URL object.
         * @returns {boolean} Whether the request is for the same origin as the application document.
         */
        function urlIsSameOrigin(requestUrl) {
            var parsed = (typeof requestUrl == "string") ? urlResolve(requestUrl) : requestUrl;
            return (parsed.protocol === originUrl.protocol &&
                parsed.host === originUrl.host);
        }
        xr.urlIsSameOrigin = urlIsSameOrigin;
        /**
         * var moviles = 'Los Moviles/Autos'
         * mz.xr.urlEncode `@api/v1/${moviles}/1` -> '@api/v1/Los%20Moviles%2FAutos/1'
         */
        function urlEncode(literalSections) {
            var substs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                substs[_i - 1] = arguments[_i];
            }
            var raw = literalSections.raw;
            var result = '';
            substs.forEach(function (subst, i) {
                var lit = raw[i];
                if (Array.isArray(subst)) {
                    subst = subst.join('');
                }
                if (!lit.endsWith('$')) {
                    subst = encodeURIComponent(subst);
                }
                else {
                    lit = lit.slice(0, -1);
                }
                result += lit;
                result += subst;
            });
            result += raw[raw.length - 1]; // (A)
            return result;
        }
        xr.urlEncode = urlEncode;
        xr.getAbsoluteUrl = (function () {
            var a;
            return function (url) {
                if (!a)
                    a = document.createElement('a');
                a.href = mz.getPath(url);
                return a.href;
            };
        })();
        function get(url, params, args) {
            return xr(mz.copy({ url: url, method: xr.Methods.GET, params: params }, args));
        }
        xr.get = get;
        ;
        function put(url, data, args) {
            return xr(mz.copy({ url: url, method: xr.Methods.PUT, data: data || {} }, args));
        }
        xr.put = put;
        ;
        function post(url, data, args) {
            return xr(mz.copy({ url: url, method: xr.Methods.POST, data: data || {} }, args));
        }
        xr.post = post;
        ;
        function patch(url, data, args) {
            return xr(mz.copy({ url: url, method: xr.Methods.PATCH, data: data || {} }, args));
        }
        xr.patch = patch;
        ;
        function del(url, args) {
            return xr(mz.copy({ url: url, method: xr.Methods.DELETE }, args));
        }
        xr.del = del;
        ;
        function options(url, args) {
            return xr(mz.copy({ url: url, method: xr.Methods.OPTIONS }, args));
        }
        xr.options = options;
        ;
    })(xr = mz.xr || (mz.xr = {}));
})(mz || (mz = {}));
var sp = String.prototype;
if (!('capitalize' in sp)) {
    sp.capitalize = function () {
        return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
}
if (!('setAt' in sp)) {
    sp.setAt = function (index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    };
}
if (!('endsWith' in sp)) {
    sp.endsWith = function (suffix) {
        suffix = suffix.toString();
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
if (!('startsWith' in sp)) {
    sp.startsWith = function (prefix) {
        prefix = prefix.toString();
        return this.indexOf(prefix) === 0;
    };
}
if (!('contains' in sp)) {
    sp.contains = function (prefix) {
        prefix = prefix.toString();
        return this.indexOf(prefix) !== -1;
    };
}
sp.toCamelCase = function () {
    return this.toLowerCase().replace(/-([a-z])/g, function (match, group1) {
        return group1.toUpperCase();
    });
};
sp.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
sp.isValidMail = function () {
    return this.length > 5 && re.test(this);
};
/// <reference path="../CORE/Xr.ts" />
/// <reference path="../CORE/Strings.ts" />
/// <reference path="JWT.ts" />
/// <reference path="../CORE/EventDispatcher.ts" />
var mz;
(function (mz) {
    var oauth2;
    (function (oauth2) {
        oauth2.roleList = [];
        var loginUrl = null;
        var refreshTokenUrl = null;
        var logoutUrl = null;
        var clientSecret = null;
        var xhrWithCredentials = null;
        var scopes = [];
        oauth2.currentDomain = extractDomain(location.href), oauth2.currentClientID = 'mz-core';
        function extractDomain(url) {
            var domain;
            var partes = url.split('/');
            //find & remove protocol (http, ftp, etc.) and get domain
            if (url.indexOf("://") > -1) {
                domain = partes[2];
            }
            else {
                if (partes[0].contains('.'))
                    domain = partes[0];
                else
                    return oauth2.currentDomain;
            }
            //find & remove port number
            domain = domain.split(':')[0];
            return domain.toLowerCase();
        }
        function tokenGetter(domain) {
            return {
                token: localStorage.getItem('JWT_' + domain) || localStorage.getItem('JWT_' + oauth2.currentDomain) || null,
                type: localStorage.getItem('JWTtype_' + domain) || 'bearer'
            };
        }
        oauth2.tokenGetter = tokenGetter;
        function setupToken(token) {
            if (mz.auth.jwt.isTokenExpired(token, 0))
                throw new Error("The provided token is expired");
            var decodedToken = mz.auth.jwt.decodeToken(token);
            if (decodedToken.role && decodedToken.role.length) {
                if (typeof decodedToken.role == "string")
                    decodedToken.role = [decodedToken.role];
                pushRoles(decodedToken.role);
            }
        }
        function setToken(domain, token, refreshToken, tokenType) {
            domain = domain.toLowerCase();
            if (token) {
                if (mz.auth.jwt.isTokenExpired(token, 0))
                    throw new Error("The provided token is expired");
                if (domain == oauth2.currentDomain) {
                    setupToken(token);
                }
                localStorage.setItem('JWT_' + domain, token);
                localStorage.setItem('JWTr_' + domain, refreshToken);
                localStorage.setItem('JWTtype_' + domain, (tokenType || 'bearer'));
            }
            else {
                localStorage.removeItem('JWT_' + domain);
                localStorage.removeItem('JWTr_' + domain);
                localStorage.removeItem('JWTtype_' + domain);
            }
        }
        oauth2.setToken = setToken;
        function checkRole(role) {
            return oauth2.roleList.indexOf(role) != -1;
        }
        oauth2.checkRole = checkRole;
        function pushRoles(roles) {
            var roleArray = roles;
            if (oauth2.roleList instanceof String)
                roleArray = oauth2.roleList.split(/[\|,]/g);
            roleArray.forEach(function (role) { return oauth2.roleList.indexOf(role) == -1 && oauth2.roleList.push(role); });
        }
        oauth2.pushRoles = pushRoles;
        /// <reference path="../CORE/Xr.ts" />
        /// <reference path="../CORE/Strings.ts" />
        /// <reference path="JWT.ts" />
        var ERROR_RESPONSES = {
            'invalid_request': [
                'The request is missing a required parameter, includes an',
                'invalid parameter value, includes a parameter more than',
                'once, or is otherwise malformed.'
            ].join(' '),
            'invalid_client': [
                'Client authentication failed (e.g., unknown client, no',
                'client authentication included, or unsupported',
                'authentication method).'
            ].join(' '),
            'invalid_grant': [
                'The provided authorization grant (e.g., authorization',
                'code, resource owner credentials) or refresh token is',
                'invalid, expired, revoked, does not match the redirection',
                'URI used in the authorization request, or was issued to',
                'another client.'
            ].join(' '),
            'unauthorized_client': [
                'The client is not authorized to request an authorization',
                'code using this method.'
            ].join(' '),
            'unsupported_grant_type': [
                'The authorization grant type is not supported by the',
                'authorization server.'
            ].join(' '),
            'access_denied': [
                'The resource owner or authorization server denied the request.'
            ].join(' '),
            'unsupported_response_type': [
                'The authorization server does not support obtaining',
                'an authorization code using this method.'
            ].join(' '),
            'invalid_scope': [
                'The requested scope is invalid, unknown, or malformed.'
            ].join(' '),
            'server_error': [
                'The authorization server encountered an unexpected',
                'condition that prevented it from fulfilling the request.',
                '(This error code is needed because a 500 Internal Server',
                'Error HTTP status code cannot be returned to the client',
                'via an HTTP redirect.)'
            ].join(' '),
            'temporarily_unavailable': [
                'The authorization server is currently unable to handle',
                'the request due to a temporary overloading or maintenance',
                'of the server.'
            ].join(' ')
        };
        var unauthorizedRetry = function (fn) {
            return (new Promise(fn)).catch(function (err) {
                if (err.status == 401) {
                    return oauth2.refreshToken().then(function (x) { return new Promise(fn); }, function (x) {
                        if (x && x.status == 401) {
                            oauth2.emit('unauthorized');
                        }
                        return Promise.reject(x);
                    });
                }
                return Promise.reject(err);
            });
        };
        var handleError = function (x) {
            var err = x;
            if (x && x.data && x.data.error) {
                var message = ERROR_RESPONSES[x.data.error] || x.data.error_message || x.data.error;
                oauth2.emit('error', 'refreshToken', x.data, message);
                if (x.data.error == "invalid_grant") {
                    localStorage.removeItem('JWTr_' + oauth2.currentDomain);
                    // must login
                    oauth2.emit('unauthorized');
                }
                err = new Error(message);
                err.name = x.data.error;
            }
            if (x.status == 401) {
                oauth2.emit('unauthorized');
            }
            return Promise.reject(err);
        };
        function applyAuthorizationHeaders(xr) {
            var domain = extractDomain(xr.url);
            var token = tokenGetter(domain);
            if (token.token) {
                xr.headers = xr.headers || {};
                if (token.type == "bearer") {
                    xr.headers['Authorization'] = "Bearer " + token.token;
                }
                else {
                    (xr.params = xr.params || {})["access_token"] = token.token;
                    xr.headers['Pragma'] = 'no-store';
                    xr.headers['Cache-Control'] = 'no-store';
                }
                xr.promise = unauthorizedRetry;
            }
        }
        oauth2.applyAuthorizationHeaders = applyAuthorizationHeaders;
        function configure(opts) {
            loginUrl = opts.loginUrl || null;
            refreshTokenUrl = opts.refreshTokenUrl || null;
            logoutUrl = opts.logoutUrl || null;
            oauth2.currentClientID = opts.clientId || null;
            clientSecret = opts.clientSecret || null;
            scopes = opts.scopes || [];
            xhrWithCredentials = opts.xhrWithCredentials;
            if (localStorage.getItem('JWT_' + oauth2.currentDomain)) {
                try {
                    setupToken(localStorage.getItem('JWT_' + oauth2.currentDomain));
                }
                catch (e) {
                    console.error(e);
                }
            }
            if (localStorage.getItem('JWTr_' + oauth2.currentDomain)) {
                refreshTokenUrl && refreshToken();
            }
        }
        oauth2.configure = configure;
        function refreshToken() {
            if (refreshTokenUrl) {
                var authString;
                if (oauth2.currentClientID) {
                    authString = oauth2.currentClientID + ':';
                    if (clientSecret)
                        authString += clientSecret;
                    authString = 'Basic ' + btoa(authString);
                }
                return mz.xr.post(refreshTokenUrl, {
                    grant_type: "refresh_token",
                    refresh_token: localStorage.getItem('JWTr_' + oauth2.currentDomain) || null
                }, {
                    skipAuthorization: true,
                    dump: mz.xr.formatters.urlEncoded,
                    headers: {
                        Authorization: authString
                    },
                    withCredentials: xhrWithCredentials
                }).then(function (x) {
                    if (x.data.access_token) {
                        oauth2.emit("gotToken", x.data.token, x.data, oauth2.currentDomain);
                        setToken(oauth2.currentDomain, x.data.access_token, x.data.refresh_token || null);
                    }
                    if (x.data.error) {
                        var message = ERROR_RESPONSES[x.data.error] || x.data.error_message || x.data.error;
                        oauth2.emit('error', 'refreshToken', x.data, message);
                        if (x.data.error == "invalid_grant") {
                            localStorage.removeItem('JWTr_' + oauth2.currentDomain);
                        }
                        var err = new Error(message);
                        err.name = x.data.error;
                        return Promise.reject(err);
                    }
                    return x;
                }, handleError);
            }
            return Promise.reject(null);
        }
        oauth2.refreshToken = refreshToken;
        function logout() {
            setToken(oauth2.currentDomain, null);
            oauth2.emit('logout');
            if (logoutUrl) {
                return mz.xr.get(logoutUrl, {}, {
                    skipAuthorization: true,
                    withCredentials: xhrWithCredentials
                }).then(function (x) {
                    return x;
                });
            }
            return Promise.resolve(null);
        }
        oauth2.logout = logout;
        function login(username, password) {
            if (loginUrl) {
                var authString;
                if (oauth2.currentClientID) {
                    authString = oauth2.currentClientID + ':';
                    if (clientSecret)
                        authString += clientSecret;
                    authString = 'Basic ' + btoa(authString);
                }
                var theScopes = void 0;
                if (scopes.length) {
                    theScopes = scopes.join(' ');
                }
                return mz.xr.post(loginUrl, {
                    grant_type: 'password',
                    username: username,
                    password: password,
                    scope: theScopes
                }, {
                    skipAuthorization: true,
                    dump: mz.xr.formatters.urlEncoded,
                    headers: {
                        Authorization: authString
                    },
                    withCredentials: xhrWithCredentials
                }).then(function (x) {
                    if (x.data.access_token) {
                        setToken(oauth2.currentDomain, x.data.access_token, x.data.refresh_token || null, (x.data.token_type || '').toLowerCase());
                    }
                    else if (x.data.error) {
                        var message = ERROR_RESPONSES[x.data.error] || x.data.error_message || x.data.error;
                        var err = new Error(message);
                        err.name = x.data.error;
                        return Promise.reject(err);
                    }
                    oauth2.emit('login', x.data);
                    return x;
                }, handleError);
            }
            return Promise.reject(null);
        }
        oauth2.login = login;
        function loggedIn() {
            var token = tokenGetter(oauth2.currentDomain);
            if (!token || !token.token)
                return false;
            try {
                return !mz.auth.jwt.isTokenExpired(token.token);
            }
            catch (e) {
                console.error(e);
            }
            return false;
        }
        oauth2.loggedIn = loggedIn;
        oauth2.on = mz.EventDispatcher.prototype.on;
        oauth2.emit = mz.EventDispatcher.prototype.emit;
        oauth2.off = mz.EventDispatcher.prototype.off;
        mz.EventDispatcher.apply(oauth2);
    })(oauth2 = mz.oauth2 || (mz.oauth2 = {}));
})(mz || (mz = {}));
/// <reference path="../strings.ts" />
/// <reference path="../Xr.ts" />
/// <reference path="define.ts" />
var mz;
(function (mz) {
    function require(a, callback) {
        var esFn = typeof callback == 'function';
        if (typeof a == 'object' && a instanceof Array && callback) {
            var count = a.length;
            var args = [];
            var elems = a;
            for (var i in elems) {
                (function (i, elem) {
                    mz.require(elem, function (ret) {
                        args[i] = ret;
                        if ((--count) == 0)
                            callback.apply(this, args);
                    });
                })(i, elems[i]);
            }
        }
        else {
            var elem = a.toString();
            if (elem == "exports") {
                if (esFn) {
                    callback({});
                }
                else {
                    console.error("require('exports') en lugar ilegal. sólo se puede utilizar en una llamada a define(['exports'], function(exports)..");
                    return {};
                }
            }
            else if (elem == "require") {
                if (esFn) {
                    callback(mz.require);
                }
                else {
                    return mz.require;
                }
            }
            else if (elem in mz.modules) {
                if (esFn) {
                    if (mz.modules[elem].loaded) {
                        callback(mz.modules[elem].exports);
                    }
                    else {
                        mz.modules[elem].callbacks.push({
                            cb: callback,
                            reqs: elems
                        });
                    }
                }
                else {
                    if (mz.modules[elem].loaded) {
                        return mz.modules[elem].exports;
                    }
                }
            }
            else {
                var promise = mz.require.route(elem).then(function (archivo) {
                    if (!archivo) {
                        if (!/\.js$/.test(elem))
                            archivo = elem + '.js';
                        else
                            archivo = elem;
                    }
                    if (archivo.endsWith('.ts')) {
                        archivo = archivo.replace(/\.ts$/, '.js');
                    }
                    if (archivo) {
                        mz.include(archivo, elem, esFn);
                    }
                    if (!esFn) {
                        if (mz.modules[elem]) {
                            if (mz.modules[elem].loaded)
                                return mz.modules[elem].exports;
                        }
                        else {
                            throw 'Módulo desconocido [[' + elem + ']]';
                        }
                    }
                    else {
                        if (mz.modules[elem]) {
                            if (mz.modules[elem].loaded)
                                callback(mz.modules[elem].exports);
                            else
                                mz.modules[elem].callbacks.push({
                                    cb: callback,
                                    reqs: elem
                                });
                            return mz.modules[elem];
                        }
                        else {
                            return null;
                        }
                    }
                });
            }
        }
    }
    mz.require = require;
    var modulosCargados = {};
    function include(url, nombreModulo, async) {
        var urlBuscada = mz.getPath(url);
        var path = urlBuscada.split('/');
        path.pop();
        var module = mz.modules[nombreModulo] = new mz.Module(nombreModulo);
        module.async = !!async;
        module.filename = urlBuscada.toString();
        module.path = path.join('/') + '/';
        //if (module.path == '/') module.path = mz.getAbsoluteUrl();
        modulosCargados[url] = loadModule(urlBuscada, module);
        if (async == false && modulosCargados[url] == false) {
            throw 'Include: No se pudo cargar el módulo [[' + nombreModulo + ']] en ' + url;
        }
        return true;
    }
    mz.include = include;
    function loadModule(url, module, async) {
        var successflag = false;
        if (mz.scriptBase) {
            var baseURL = mz.xr.getAbsoluteUrl(mz.scriptBase.toLowerCase()).toLowerCase();
            url = mz.xr.getAbsoluteUrl(url);
            if (url.toLowerCase().startsWith(baseURL)) {
                url = url.toLowerCase().replace(baseURL, '');
            }
        }
        var processResponse = function (result) {
            //try {
            var bkCM = mz.define.currentModule || null;
            mz.define.currentModule = module;
            var bkRequire = mz.globalContext.require;
            var bkExports = mz.globalContext.exports;
            var bkModulo = mz.globalContext.module;
            var bkDefine = mz.globalContext.define;
            try {
                mz.globalContext.define = module.define.bind(module);
                mz.globalContext.exports = module.exports;
                mz.globalContext.require = module.require.bind(module);
                mz.globalContext.module = module;
                mz.globalContext.define.amd = bkDefine.amd;
                (function (str) {
                    return eval(str);
                }).call(module.exports, result + '\n//@ sourceURL=' + url);
            }
            finally {
                mz.globalContext.define = bkDefine;
                mz.globalContext.exports = bkExports;
                mz.globalContext.require = bkRequire;
                mz.globalContext.module = bkModulo;
            }
            /*
            jQuery.globalEval(
                'var a = mz.proxy(mzcore.define.currentModule, "define");a.amd = mzcore.define.amd;(function(require, exports, module, define, ñ){ ' +
                result +
                '\n})(mz.proxy(mzcore.define.currentModule, "require"), mzcore.define.currentModule.exports, mzcore.define.currentModule, a, mz.proxy(mzcore.define.currentModule, "ñ"));\n' +
                '//@ sourceURL=' + (module.id || url)
            );
            */
            if (mz.define.currentModule) {
                mz.define.currentModule.loaded = true;
                if (mz.define.currentModule.defined == false) {
                    mz.define.currentModule.ModuleExports.set(mz.define.currentModule.exports, []);
                }
            }
            mz.define.currentModule = bkCM;
            successflag = true;
            /*} catch (e) {
            console.error('Include: Parser: No se pudo cargar el módulo [[' + (module.id || url) + ']] en ' + url, e, e.stack);

            if ('error' in e && 'message' in e) {
            console.error(e.error, e.message, e.stack);
            }
            }*/
        };
        if (mz.hardCodedFiles && url in mz.hardCodedFiles) {
            processResponse(mz.hardCodedFiles[url]);
        }
        else {
            jQuery.ajax({
                async: module.async,
                type: "GET",
                url: url,
                data: null,
                success: function (result) {
                    processResponse(result);
                },
                fail: function () {
                    console.error('Include: No se pudo cargar el módulo [[' + (module.id || url) + ']] en ' + url);
                },
                dataType: 'text'
            });
        }
        return successflag;
    }
})(mz || (mz = {}));
var mz;
(function (mz) {
    var require;
    (function (require) {
        var escapeRegExp = function (str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        };
        require.routes = [];
        function route(source, dest) {
            if (arguments.length == 1 && typeof source === 'string') {
                for (var i in require.routes) {
                    var rt = require.routes[i];
                    if (typeof rt.source === "string" && rt.source == source) {
                        return Promise.resolve(rt.destination);
                    }
                    else if (typeof require.routes[i].destination === "function") {
                        return require.routes[i].destination(source);
                    }
                    else if (rt.source.test(source)) {
                        return Promise.resolve(source.replace(require.routes[i].source, require.routes[i].destination));
                    }
                }
            }
            else if (arguments.length == 2) {
                var routeIndex = -1, key = source.toString();
                for (var i in require.routes)
                    if (require.routes[i].key == key) {
                        routeIndex = i;
                        break;
                    }
                var newRoute = {
                    key: key,
                    source: source instanceof RegExp ? source : new RegExp('^' + escapeRegExp(source).replace(/\\\*/g, '([\\w-]+)') + '$'),
                    destination: dest
                };
                if (routeIndex == -1)
                    require.routes.push(newRoute);
                else
                    require.routes[routeIndex] = newRoute;
            }
            return Promise.resolve(null);
        }
        require.route = route;
        route('http://*', 'http://$1');
        route('https://*', 'https://$1');
        route('/*.js', '/$1.js');
        function defineFiles(files) {
            for (var i in files) {
                mz.hardCodedFiles[i.toLowerCase()] = files[i];
            }
        }
        require.defineFiles = defineFiles;
    })(require = mz.require || (mz.require = {}));
})(mz || (mz = {}));
mz.require.route("jquery", "@mz/jquery.js");
window.require = mz.require;
/// <reference path="Require.ts" />
/// <reference path="..\..\mz.ts" />
var mz;
(function (mz) {
    var testRequires = /require\(\w*(('|")([^\)\2]+)\2)\w*\)/g;
    mz.modules = {};
    var Module = (function () {
        function Module(name) {
            this.exports = null;
            this.loaded = false;
            this.parent = null;
            this.children = [];
            this.filename = null;
            this.path = null;
            this.defined = false;
            this.async = false;
            this.callbacks = [];
            this.dependencias = {};
            this.id = name || null;
            this.define.amd = mz.define.amd || {};
            this.ModuleExports = new ModuleExports(this);
        }
        Module.prototype.getPath = function (x) {
            return mz.getPath(x, this.path);
        };
        Module.prototype.require = function (Module, b) {
            if (Module instanceof Array) {
                var r = [];
                for (var i in Module) {
                    var original = r[i];
                    r[i] = this.getPath(Module[i]);
                    if (original != r[i]) {
                        if (r[i].startsWith('http') && !r[i].endsWith('.js'))
                            r[i] += '.js';
                    }
                }
                return mz.require(r, b);
            }
            else
                return mz.require(this.getPath(Module), b);
        };
        Module.prototype.define = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var ret = mz.define.apply(null, arguments);
            mz.define.lastModule.parent = this;
            this.children.push(mz.define.lastModule);
            return ret;
        };
        return Module;
    })();
    mz.Module = Module;
    var ModuleExports = (function () {
        function ModuleExports(theModule) {
            this.module = theModule;
            this.module.exports = {};
            this.seteado = false;
        }
        ModuleExports.prototype.set = function (factory, params) {
            if (mz._debug && typeof factory == 'function') {
                if (testRequires.test(factory)) {
                    var that = this;
                    var deps = null;
                    var depsCargadas = null;
                    String(factory).replace(testRequires, function (all, d1, d2, key) {
                        if (!(key in that.module.dependencias)) {
                            if (key in mz.modules) {
                                depsCargadas = depsCargadas || {};
                                depsCargadas[key] = (depsCargadas[key] || 0) + 1;
                            }
                            else {
                                deps = deps || {};
                                deps[key] = (deps[key] || 0) + 1;
                            }
                        }
                    });
                    if (deps) {
                        console.group(this.module.id + " - Dependencias sincrónicas NO definidas NI cargadas");
                        for (var i in deps) {
                            if (!(i in mz.modules))
                                console.error(i, deps[i]);
                        }
                        console.groupEnd();
                    }
                }
            }
            var result;
            if (typeof factory === 'function') {
                var bkRequire = mz.globalContext.require;
                var bkExports = mz.globalContext.exports;
                var bkModulo = mz.globalContext.module;
                var bkDefine = mz.globalContext.define;
                try {
                    mz.globalContext.define = this.module.define.bind(this.module);
                    mz.globalContext.exports = this.module.exports;
                    mz.globalContext.require = this.module.require.bind(this.module);
                    mz.globalContext.module = this.module;
                    mz.globalContext.define.amd = bkDefine.amd;
                    result = factory.apply(this.module.exports, params);
                }
                finally {
                    mz.globalContext.define = bkDefine;
                    mz.globalContext.exports = bkExports;
                    mz.globalContext.require = bkRequire;
                    mz.globalContext.module = bkModulo;
                }
            }
            else
                result = factory;
            this.seteado = true;
            if (result !== this.module.exports) {
                if (isDef(result) && typeof result != "string" && typeof result != "number" && typeof result != "boolean") {
                    this.module.exports = mz.copy(result, this.module.exports);
                }
            }
            this.module.defined = true;
            this.module.loaded = true;
            var cb = null;
            while (this.module.callbacks.length && (cb = this.module.callbacks.shift())) {
                if (cb.cb)
                    cb.cb(this.module.exports);
            }
        };
        return ModuleExports;
    })();
    mz.ModuleExports = ModuleExports;
})(mz || (mz = {}));
/// <reference path="module.ts" />
var mz;
(function (mz) {
    function undefine(mod) {
        if (mod in mz.modules) {
            mz.modules[mod] = null;
            delete mz.modules[mod];
        }
    }
    mz.undefine = undefine;
    function define() {
        var name = mz.buscarArgumentoTipo('string', arguments) || (mz.define.currentModule ? mz.define.currentModule.id : null) || null;
        var fn = mz.buscarArgumentoTipo('function', arguments) || null;
        var reqs = mz.buscarArgumentoTipo(Array, arguments) || null;
        var obj = !fn && arguments.length && typeof arguments[arguments.length - 1] == "object" && arguments[arguments.length - 1] || null;
        if (!fn && obj) {
            fn = obj;
        }
        var module = null;
        if (mz.define.currentModule && mz.define.currentModule.id == name) {
            module = mz.define.currentModule;
            mz.define.currentModule = null;
        }
        else {
            module = new mz.Module(name);
            if (obj)
                module.exports = obj;
        }
        mz.define.lastModule = module;
        if (name !== null) {
            if (name in mz.modules && mz.modules[name] !== module) {
                if (mz._debug)
                    debugger;
                throw "Ya está definido " + name;
            }
            mz.modules[name] = module;
            if (reqs && reqs.length) {
                var args = [];
                if (module.async) {
                    module.require(reqs, function (args) {
                        for (var i in reqs) {
                            if (reqs[i] == "exports")
                                arguments[i] = module.exports;
                            else if (reqs[i] == "require")
                                arguments[i] = module.require;
                        }
                        module.ModuleExports.set(fn, arguments);
                    });
                }
                else {
                    for (var i in reqs) {
                        if (reqs[i] == "exports") {
                            module.dependencias[reqs[i]] = args[i] = module.exports;
                        }
                        else if (reqs[i] == "require")
                            module.dependencias[reqs[i]] = args[i] = module.require;
                        else
                            module.dependencias[reqs[i]] = args[i] = module.require(reqs[i]);
                    }
                    module.ModuleExports.set(fn, args);
                }
            }
            else {
                module.ModuleExports.set(fn, []);
            }
        }
        else {
            module.ModuleExports.set(fn, []);
        }
        return module.exports;
    }
    mz.define = define;
    define.amd = {};
})(mz || (mz = {}));
var mz;
(function (mz) {
    var define;
    (function (define) {
    })(define = mz.define || (mz.define = {}));
})(mz || (mz = {}));
mz.globalContext.define = mz.define;
/// <reference path="Define.ts" />
/// <reference path="Require.ts" />
mz.define("jquery", function () { return jQuery; });
mz.require.route("backbone", "@mz/backbone-min.js");
mz.require.route("underscore", "@mz/underscore-min.js");
if (mz.globalContext.Backbone) {
    mz.define("backbone", function () { return mz.globalContext.Backbone; });
}
if (mz.globalContext._) {
    mz.define("underscore", function () { return mz.globalContext._; });
}
/// <reference path="MVCObject.ts" />
/// <reference path="../mz.ts" />
var mz;
(function (mz) {
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(base, opc) {
            _super.call(this);
            this.opciones = {};
            this.__indice__ = {};
            this.agregandoLote = false;
            this.insert = this.push;
            this.opciones = opc || {};
            this.array = (this.opciones.initialSize ? new Array(this.opciones.initialSize) : new Array());
            base && this.addRange(base);
        }
        Collection.prototype.first = function () {
            return this.array[0];
        };
        Collection.prototype.last = function () {
            if (this.array.length)
                return this.array[this.array.length - 1];
        };
        /**
        Limpia la coleccion
        @method clear
        @param {Boolean} noTriggerear si es "true" entonces no se desencadena ningun evento del tipo "changed"
        */
        Collection.prototype.clear = function (noTriggerear) {
            this.trigger(Collection.EVENTS.BeforeClearCollection, !!noTriggerear);
            this.array.length = 0;
            this.__indice__ = {};
            this.trigger(Collection.EVENTS.AfterClearCollection, !!noTriggerear);
            !noTriggerear && this.emit(Collection.EVENTS.Changed, 'clear', !!noTriggerear);
        };
        Object.defineProperty(Collection.prototype, "length", {
            /**
            Tamaño de la coleccion (getter)
            @property length
            */
            get: function () {
                return this.array.length;
            },
            /**
            Tamaño de la coleccion (setter)
            @property length
            */
            set: function (value) {
                if (isNaN(value) || value < 0)
                    throw new TypeError();
                this.setLength(value);
            },
            enumerable: true,
            configurable: true
        });
        Collection.prototype.getLength = function () {
            return this.array.length;
        };
        Collection.prototype.setLength = function (nuevoTamanio) {
            if (nuevoTamanio < 0)
                throw "Tamanio invalido";
            if (this.getLength() > nuevoTamanio) {
                while (this.getLength() > nuevoTamanio) {
                    this.pop();
                }
            }
            else {
                this.array.length = nuevoTamanio;
            }
            this.emit(Collection.EVENTS.Changed, 'length', this.array.length);
            return this;
        };
        /**
        The map() method creates a new array with the results of calling a provided function on every element in this array.
        El contexto "this" es el segundo argumento si se especifica, sino es la coleccion
        @method map
        @param {Function} callback función que se va a ejecutar, a esta function se le pasa 1 argumento, el elemento de la coleccion que se esta iterando
        */
        Collection.prototype.map = function (func, thisp) {
            var thisp = arguments[1] || this;
            var coll = new Collection();
            for (var i = 0; i < this.array.length; i++)
                (i in this.array) && coll.push(func.call(thisp, this.array[i]));
            return coll;
        };
        ;
        /**
        The forEach() method executes a provided function once per array element.
        El contexto "this" es el segundo argumento si se especifica, sino es la coleccion
        @method forEach
        @param {Function|MzDelegate} callback función que se va a ejecutar, a esta function se le pasan 2 argumentos, el elemento de la coleccion que se esta iterando y el indice (zero based) dentro de la coleccion.
        */
        Collection.prototype.forEach = function (func, thisp) {
            var thisp = arguments[1] || this;
            if ('forEach' in this.array) {
                this.array.forEach(func, thisp);
            }
            else {
                for (var i = 0; i < this.array.length; i++)
                    (i in this.array) && typeof this.array[i] != 'undefined' && func.call(thisp, this.array[i], i);
            }
        };
        /**
         * Basicamente lo que hace esta funcion es ejecutar lotes asincronicos que diren X tiempo cada uno, es util para procesar grandes cantidades de informacion y darle un feedback al usuario sin bloquear la pantalla.
         * Si iterationDurationMs es 0, entonces utiliza setImmediate y el tiempo de cada iteracion se setea en 32ms
         */
        Collection.prototype.asyncForEach = function (func, iterationDurationMs) {
            if (this.array.length) {
                var items = this.array.concat();
                var that = this;
                var timerFn = iterationDurationMs <= 0 ? setImmediate : setTimeout;
                if (iterationDurationMs <= 0)
                    iterationDurationMs = 32;
                iterationDurationMs = Math.abs(iterationDurationMs || 32);
                var i = 0;
                function sch() {
                    timerFn(function () {
                        var start = mz.now();
                        while (mz.now() - start < iterationDurationMs && items.length) {
                            func.call(that, items.shift(), i);
                            i++;
                        }
                        if (items.length)
                            sch();
                    }, iterationDurationMs);
                }
                sch();
            }
        };
        Collection.prototype._indizar = function (elem, index) {
            if (this.opciones.key) {
                if (!(this.opciones.key in elem))
                    throw "No tiene la clave primaria";
                if (typeof elem[this.opciones.key] != 'undefined') {
                    this.__indice__[elem[this.opciones.key]] = index;
                }
            }
        };
        Collection.prototype._deindizar = function (elem) {
            if (this.opciones.key) {
                if (typeof elem[this.opciones.key] != 'undefined') {
                    if (elem[this.opciones.key] in this.__indice__) {
                        delete this.__indice__[elem[this.opciones.key]];
                    }
                }
            }
        };
        Collection.prototype._reindizar = function () {
            if (this.opciones.key) {
                this.__indice__ = {};
                var that = this;
                this.forEach(function (e, i) {
                    if (e && typeof e[that.opciones.key] != 'undefined') {
                        that.__indice__[e[that.opciones.key]] = i;
                    }
                });
            }
        };
        /**
        Obtiene el elemento en la posicion "index" de la coleccion
        @method getAt
        @param {Number} index
        */
        Collection.prototype.getAt = function (index) {
            return this.array[index];
        };
        Collection.prototype.reduce = function (fn, initialValue) {
            return this.array.reduce(fn, initialValue);
        };
        /**
        Agrupa los elementos de la colección.
        Si "what" es tipo String, entonces va a asumir que es un campo y va a agrupar por ese campo.
        Si "what" es tipo Function, va a evaluar la función por cada elemento de la colección y agrupa por el resultado.

        Este método devuelve un objeto tipo Diccionario con el criterio de evaluación como clave y una coleccion de elementos como value
        @method groupBy
        @param {Mixed} what
        */
        Collection.prototype.groupBy = function (what) {
            var fn;
            if (typeof what != 'function') {
                throw new TypeError();
            }
            else {
                fn = what;
            }
            if (!fn)
                return {};
            var output = {};
            this.forEach(function (e) {
                var g = fn(e);
                if (g) {
                    if (g in output) {
                        output[g].push(e);
                    }
                    else {
                        output[g] = new Collection([e], this.opciones);
                    }
                }
            });
            return output;
        };
        Object.defineProperty(Collection.prototype, "key", {
            /**
            Obtiene la key de la coleccion
            @property key
            */
            get: function () {
                return this.opciones && this.opciones.key;
            },
            enumerable: true,
            configurable: true
        });
        /**
        Inserta un elemento en cualquier posicion de la coleccion. Dispara evento "changed" con los mismos argumentos que el evento "insert_at"
        @method insertAt
        @param {Number} indice
        @param {Mixed} elemento
        */
        Collection.prototype.insertAt = function (indice, elemento) {
            if (this.opciones.key) {
                if (!(this.opciones.key in elemento)) {
                    console.error('El elemento insertado no tiene el campo ' + this.opciones.key);
                    return;
                }
                if (elemento[this.opciones.key] in this.__indice__) {
                    console.error('El elemento insertado ya existe en la coleccion ' + this.opciones.key + "=" + elemento[this.opciones.key]);
                    return;
                }
            }
            if (indice == this.array.length) {
                this.array.push(elemento);
                this._indizar(elemento, indice);
            }
            else {
                var fin = this.array.splice(indice);
                this.array.push(elemento);
                this.array = this.array.concat(fin);
                this._reindizar();
                this.emit(Collection.EVENTS.CollectionSorted);
                this.emit(Collection.EVENTS.Changed, Collection.EVENTS.CollectionSorted);
            }
            this.emit(Collection.EVENTS.ElementInserted, indice, elemento);
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementInserted, indice, elemento);
        };
        /**
        Remueve un elemento en cualquier posicion de la coleccion. Dispara evento "changed" con los mismos argumentos que el evento "remove_at"
        @method removeAt
        @param {Number} indice
        @param {Mixed} elemento
        */
        Collection.prototype.removeAt = function (indice) {
            var backup = this.array[indice];
            this.array.splice(indice, 1);
            this._reindizar();
            this.emit(Collection.EVENTS.ElementRemoved, indice, backup);
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementRemoved, indice, backup);
            return backup;
        };
        /**
        Cambia un elemento en cualquier posicion de la coleccion. Dispara evento "changed" con los mismos argumentos que el evento "set_at"
        @method set_at
        @param {Number} indice
        @param {Mixed} elemento
        */
        Collection.prototype.setAt = function (indice, elemento) {
            var backup = this.array[indice];
            this._deindizar(backup);
            this.array[indice] = elemento;
            this._indizar(elemento, indice);
            this.emit(Collection.EVENTS.ElementChanged, indice, elemento, backup);
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementChanged, indice, elemento, backup);
        };
        /**
        Inserta un elemento al final de la colección. Dispara evento "insert_at" y "changed" con los mismos argumentos
        @method push
        @param {Mixed} elemento
        @param {Bool} noTriggerear si == 'true' entonces no se dispara ningún evento.
        */
        Collection.prototype.push = function (elemento, noTriggerear) {
            var indice = -1;
            if (this.opciones.key) {
                if (!(this.opciones.key in elemento)) {
                    console.error('El elemento insertado no tiene el campo ' + this.opciones.key);
                    return indice;
                }
                if (elemento[this.opciones.key] in this.__indice__) {
                    console.error('El elemento insertado ya existe en la coleccion ' + this.opciones.key + "=" + elemento[this.opciones.key]);
                    return indice;
                }
            }
            indice = this.array.push(elemento) - 1;
            try {
                this._indizar(elemento, indice);
            }
            catch (e) {
                this.array.pop();
                console.error('El elemento insertado no tiene el campo ' + this.opciones.key);
                return -1;
            }
            if (!noTriggerear) {
                this.emit(Collection.EVENTS.ElementInserted, indice, elemento);
                this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementInserted, indice, elemento);
            }
            return indice;
        };
        /**
        Quita el elemento al final de la colección. Dispara evento "remove_at" y "changed" con los mismos argumentos
        @method pop
        @param {Bool} noTriggerear si == 'true' entonces no se dispara ningún evento.
        */
        Collection.prototype.pop = function (noTriggerear) {
            if (this.array.length > 0) {
                var ret = this.array.pop();
                this._deindizar(ret);
                if (!noTriggerear) {
                    this.emit(Collection.EVENTS.ElementRemoved, this.array.length, ret);
                    this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementRemoved, this.array.length, ret);
                }
                return ret;
            }
            return null;
        };
        Collection.prototype.addRange = function (array, noTriggerearCadaUno, noTriggerear) {
            if (!array)
                return this;
            var inicio = this.array.length - 1;
            this.agregandoLote = true;
            if (Object.prototype.toString.call(array).toLowerCase() === "[object array]" || array instanceof Collection) {
                if ('forEach' in array && typeof array.forEach == 'function') {
                    var that = this;
                    array.forEach(function (elem) {
                        that.push(elem, noTriggerearCadaUno);
                    });
                }
                else {
                    for (var i = 0; i < array.length; i++)
                        this.push(array[i], noTriggerearCadaUno);
                }
            }
            else {
                for (var i_4 in array)
                    this.push(array[i_4], noTriggerearCadaUno);
            }
            if (!noTriggerear) {
                this.emit(Collection.EVENTS.ElementRangeInserted, inicio, this.array.length - 1, !noTriggerearCadaUno);
                this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementRangeInserted, inicio, this.array.length - 1, !noTriggerearCadaUno);
            }
            this.agregandoLote = false;
            return this;
        };
        /**
        Cuando se actualiza un valor en la colección y se quiere informar, se invoca a un método "update", "updateByKey" o "updateIndex".
        Estos desencadenan los eventos "set_at" y "changed".

        Si la coleccion tiene Key entonces busca en el indice. no importa que no sea el mismo elemento. De otro modo busca la referencia a ese elemento.

        @method update
        @param {Mixed} elemento El elemento a ser actualizado
        */
        Collection.prototype.update = function (elemento) {
            var indice = -1;
            if (this.opciones.key && this.opciones.key in elemento && elemento[this.opciones.key] in this.__indice__ && this.array[indice = this.__indice__[elemento[this.opciones.key]]] === elemento) {
                return this.updateIndex(indice);
            }
            return this.updateIndex(this.indexOf(elemento));
        };
        /**
        Cuando se actualiza un valor en la colección y se quiere informar, se invoca a un método "update", "updateByKey" o "updateIndex".
        Estos desencadenan los eventos "set_at" y "changed".

        @method updateByKey
        @param {String} key clave a ser buscada en el índice interno
        */
        Collection.prototype.updateByKey = function (key) {
            if (this.opciones.key && key in this.__indice__) {
                return this.updateIndex(this.__indice__[key]);
            }
        };
        /**
        Cuando se actualiza un valor en la colección y se quiere informar, se invoca a un método "update", "updateByKey" o "updateIndex".
        Estos desencadenan los eventos "set_at" y "changed".

        @method updateIndex
        @param {Nuber} indice ïndice del elemento a ser actualizado
        */
        Collection.prototype.updateIndex = function (index) {
            if (index != -1) {
                var elemento = this.getAt(index);
                this.emit(Collection.EVENTS.ElementChanged, index, elemento, elemento);
                this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementChanged, index, elemento, elemento);
            }
            return this;
        };
        Collection.prototype.join = function (delimitador) {
            return this.array.join(delimitador);
        };
        /**
        Suma elementos
        @method sum
        @param {Mixed} opciones
        @param {Mixed} opciones.groupBy Si se van a agrupar los elementos
        @param {Array de strings} opciones.exclude Si no se quiere sumarizar algunos campos
        @param {Array de strings} opciones.filtroCampos Si se quiere especificar en cuales campos se va a sumarizar
        */
        Collection.prototype.sum = function (options) {
            var result = [];
            var groupByField = options.groupBy || null;
            var sumarizarSubSet = function (col) {
                var out = null;
                var cant = 0;
                col.forEach(function (elem) {
                    if (out) {
                        for (var i in elem) {
                            if (groupByField != i && typeof elem[i] == 'number' && (typeof out[i] == 'number' || typeof out[i] == 'undefined') && (!options || ((!options.filtroCampos || options.filtroCampos.indexOf(i) != -1) && (!options.exclude || options.exclude.indexOf(i) == -1)))) {
                                out[i] = (out[i] || 0) + elem[i];
                            }
                        }
                        out['[[cantidad]]']++;
                    }
                    else {
                        out = {};
                        Object.defineProperty(out, '[[cantidad]]', {
                            enumerable: false,
                            get: function () { return cant; },
                            set: function (value) { cant = value; }
                        });
                        groupByField && (out[groupByField] = elem[groupByField]);
                        for (var i in elem) {
                            if (groupByField != i && typeof elem[i] == 'number' && (!options || ((!options.filtroCampos || options.filtroCampos.indexOf(i) != -1) && (!options.exclude || options.exclude.indexOf(i) == -1)))) {
                                out[i] = elem[i];
                            }
                        }
                        out['[[cantidad]]'] = 1;
                    }
                });
                return out;
            };
            if (groupByField == null)
                return sumarizarSubSet(this);
            var subsets = this.groupBy(groupByField);
            for (var i in subsets) {
                result.push(sumarizarSubSet(subsets[i]));
            }
            return result;
        };
        /**
         *	Simplemente ordena la colección. "what" puede tener cualquiera de estos formatos
         *		'Campo ASC, CampoB DESC'
         *		function(a, b) { return (a.Campo > b.Campo ? 1 : - 1) }
         *		'Campo'
         *
         *
         *	@method orderBy
         *	@param {Mixed} what
         */
        Collection.prototype.orderBy = function (what) {
            var orderBy = what ? mz.data.order.build(what) : undefined;
            this.array.sort(orderBy);
            this._reindizar();
            this.emit(Collection.EVENTS.CollectionSorted, what, 'ASC');
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.CollectionSorted, what);
            return this;
        };
        Collection.prototype.orderByDesc = function (what) {
            var fn = what ? mz.data.order.build(what) : null;
            if (fn) {
                this.array.sort(function (a, b) {
                    return -fn(a, b);
                });
            }
            else {
                this.array.sort();
                this.array.reverse();
            }
            this._reindizar();
            this.emit(Collection.EVENTS.CollectionSorted, what, 'DESC');
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.CollectionSorted, what);
            return this;
        };
        /**
        Devuelve true si hay algun elemento que cumpla con la condición
        @method some
        @param {Function} condicion
        */
        Collection.prototype.some = function (condition) {
            if ('some' in this.array)
                return this.array.some(condition);
            for (var i = 0; i < this.array.length; i++)
                if (i in this && condition.call(arguments[1], this[i], i, this))
                    return true;
            return false;
        };
        /**
         *	Devuelve una coleccion de elementos que cumplan con la condición. También se puede llamar usando dos argumentos
         *			.where('Campo', 3)
         *	Y va a devolver una colección con todos los elementos de la primera que tengan Campo == 3
         *	@method where
         *	@param {Function} condicion
         */
        Collection.prototype.where = function (campoOCondicion, valorCampo) {
            if (typeof campoOCondicion === "string") {
                var arr = new Collection();
                for (var i = 0; i < this.array.length; i++)
                    if ((i in this.array) && this.array[i][campoOCondicion] == arguments[1])
                        arr.push(this.array[i]);
                return arr;
            }
            else {
                if (this.array.filter)
                    return new Collection(this.array.filter(campoOCondicion));
                var arr = new Collection();
                for (var i = 0; i < this.array.length; i++)
                    if ((i in this.array) && campoOCondicion(this.array[i]))
                        arr.push(this.array[i]);
                return arr;
            }
        };
        /**
        Remueve un elemento buscandolo por clave
        @method removeByKey
        @param {String} key
        */
        Collection.prototype.removeByKey = function (key) {
            var indice = this.indexedGetIndex(key);
            if (indice != -1)
                return this.removeAt(indice);
        };
        /**
        Remueve el elemento pasado, o varios elementos en base a una condición.

        - Si se pasa el elemento para remover && la colección tiene clave primaria se va a remover por clave y no por referencia del objeto.
        - Si se pasa uno solo y hay varios elementos que matchean o esta repetido en la colección se va a remover el ultimo.
        - De esta forma se desencadena el evento "remove_at" y "changed" con los mismos argumentos

        Si se pasa una cóndición, el método devuelve una colección con los elementos quitados.

        - De esta forma se desencadena el evento "removed" y "changed" con los mismos argumentos

        @method remove
        @param {Mixed} condicion/elemento
        */
        Collection.prototype.remove = function (condicion) {
            var fn = condicion;
            var tipo = typeof fn;
            if (arguments.length == 1) {
                var cual = -1;
                if (this.opciones.key && this.opciones.key in fn) {
                    cual = this.indexedGetIndex(fn[this.opciones.key]);
                    if (cual !== -1 && fn !== this.getAt(cual)) {
                        cual = -1;
                    }
                }
                if (cual == -1)
                    cual = this.lastIndexOf(fn);
                if (cual != -1) {
                    return [this.removeAt(cual)];
                }
                if (tipo == 'object' || tipo == 'number' || tipo == 'boolean')
                    return null;
            }
            if (tipo === 'function') {
                var sacadas = [];
                for (var i = 0; i < this.array.length; i++) {
                    if (i in this.array) {
                        if (condicion(this.array[i])) {
                            sacadas.push({
                                i: i,
                                e: this.array[i]
                            });
                        }
                    }
                }
                var that = this;
                var salida = [];
                if (sacadas.length) {
                    sacadas.forEach(function (e) {
                        that.remove(e.e);
                        salida.push(e.e);
                    });
                    this.emit(Collection.EVENTS.ElementRangeRemoved, salida);
                    this.emit(Collection.EVENTS.Changed, Collection.EVENTS.ElementRangeRemoved, salida);
                }
                return salida;
            }
        };
        Collection.prototype.single = function (field, value) {
            if (arguments.length == 2 && typeof field == "string") {
                //Busco por el indice
                if (this.opciones.key) {
                    if (field === this.opciones.key) {
                        if (arguments[1] in this.__indice__) {
                            var tmp = this.array[this.__indice__[arguments[1]]];
                            if (tmp && tmp[field] == arguments[1])
                                return tmp;
                        }
                    }
                }
                for (var i = 0; i < this.array.length; i++)
                    if (this.array[i] && this.array[i][field] == arguments[1])
                        return this.array[i];
            }
            else {
                for (var i = 0; i < this.array.length; i++)
                    if (this.array[i] && field(this.array[i]))
                        return this.array[i];
            }
            return null;
        };
        /**
        Devuelve true si la coleccion contiene el elemento (busca por referencia, tiene que ser EL MISMO)
        @method contains
        @param {Object} elemento
        */
        Collection.prototype.contains = function (elem) {
            return this.array.indexOf(elem) != -1;
        };
        /**
        Devuelve true si la coleccion contiene la clave
        @method containsKey
        @param {String} key
        */
        Collection.prototype.containsKey = function (key) {
            if (this.opciones.key) {
                return (key in this.__indice__);
            }
            else {
                throw "La coleccion no tiene key";
            }
        };
        /**
        Devuelve el indice de la primer ocurrencia del elemento. Si no lo encuentra devuelve -1
        @method indexOf
        @param {Object} elemento
        */
        Collection.prototype.indexOf = function (elem) { return this.array.indexOf(elem); };
        /**
        Devuelve el indice de la última ocurrencia del elemento. Si no lo encuentra devuelve -1
        @method lastIndexOf
        @param {Object} elemento
        */
        Collection.prototype.lastIndexOf = function (elem) { return this.array.lastIndexOf(elem); };
        /**
        Crea un array y lo llena con el contenido de la colección
        @method toArray
        */
        Collection.prototype.toArray = function () {
            var t = [];
            for (var i = 0; i < this.array.length; i++)
                (i in this.array) && t.push(this.array[i]);
            return t;
        };
        /**
        Clona la colección. Las referencias a los objetos van a ser las mismas.
        @method clone
        */
        Collection.prototype.clone = function () {
            var coll = new Collection(null, mz.copy(this.opciones));
            for (var i = 0; i < this.array.length; i++)
                (i in this.array) && coll.push(this.array[i]);
            return coll;
        };
        /**
        Obtiene un elemento buscando en el indice interno por clave primaria
        @method indexedGet
        @param {String} key
        */
        Collection.prototype.indexedGet = function (key) {
            if (this.opciones.key) {
                if (key in this.__indice__)
                    return this.array[this.__indice__[key]];
            }
            return null;
        };
        /**
        Obtiene el índice un elemento buscando en el indice interno por clave primaria
        @method indexedGetIndex
        @param {String} key
        */
        Collection.prototype.indexedGetIndex = function (key) {
            if (this.opciones.key) {
                if (key in this.__indice__)
                    return this.__indice__[key];
            }
            return -1;
        };
        /**
        Hace un merge de un elemento dentro de la colección. Busca el elemento por clave primaria y actualiza sus prupiedades copiandole los nuevos campos. Si no lo encuentra lo inserta.
        @method mergeElem
        @param {Object} elem
        */
        Collection.prototype.mergeElem = function (elem) {
            if (this.opciones.key) {
                if (!(this.opciones.key in elem)) {
                    throw new Error("El elemento no contiene la clave primaria");
                }
                var indice = this.indexedGetIndex(elem[this.opciones.key]);
                if (indice != -1) {
                    mz.copy(this.array[indice], elem);
                    this.updateIndex(indice);
                    return this.array[indice];
                }
                else {
                    this.push(elem);
                    return elem;
                }
            }
        };
        /**
            Buscar el o los elementos mas grandes
            @method max
            @param {Mixed} opciones
            @param {Mixed} opciones.groupBy Si se van a agrupar los elementos
            @param {Array de strings} opciones.exclude Si no se quiere sumarizar algunos campos
            @param {Array de strings} opciones.filtroCampos Si se quiere especificar en cuales campos se va a sumarizar
            */
        Collection.prototype.max = function (opc) {
            var result = [];
            var groupByField = opc.groupBy || null;
            var sumarizarSubSet = function (col) {
                var out = null;
                col.forEach(function (elem) {
                    if (out) {
                        for (var i in elem) {
                            if (groupByField != i && typeof elem[i] == 'number' && (typeof out[i] == 'number' || typeof out[i] == 'undefined') && (!opc || ((!opc.filtroCampos || opc.filtroCampos.indexOf(i) != -1) && (!opc.exclude || opc.exclude.indexOf(i) == -1)))) {
                                if (elem[i] != null && (!(i in out) || out[i] < elem[i]))
                                    out[i] = elem[i];
                            }
                        }
                    }
                    else {
                        out = {};
                        groupByField && (out[groupByField] = elem[groupByField]);
                        for (var i in elem) {
                            if (groupByField != i && typeof elem[i] == 'number' && (!opc || ((!opc.filtroCampos || opc.filtroCampos.indexOf(i) != -1) && (!opc.exclude || opc.exclude.indexOf(i) == -1)))) {
                                out[i] = elem[i];
                            }
                        }
                    }
                });
                return out;
            };
            if (groupByField == null)
                return sumarizarSubSet(this);
            var subsets = this.groupBy(groupByField);
            for (var i in subsets) {
                result.push(sumarizarSubSet(subsets[i]));
            }
            return result;
        };
        /**
            Buscar el o los elementos mas chicos
            @method min
            @param {Mixed} opciones
            @param {Mixed} opciones.groupBy Si se van a agrupar los elementos
            @param {Array de strings} opciones.exclude Si no se quiere sumarizar algunos campos
            @param {Array de strings} opciones.filtroCampos Si se quiere especificar en cuales campos se va a sumarizar
            */
        Collection.prototype.min = function (opc) {
            var result = [];
            var groupByField = opc.groupBy || null;
            var sumarizarSubSet = function (col) {
                var out = null;
                col.forEach(function (elem) {
                    if (out) {
                        for (var i in elem) {
                            if (groupByField != i && typeof elem[i] == 'number' && (typeof out[i] == 'number' || typeof out[i] == 'undefined') && (!opc || ((!opc.filtroCampos || opc.filtroCampos.indexOf(i) != -1) && (!opc.exclude || opc.exclude.indexOf(i) == -1)))) {
                                if (elem[i] != null && (!(i in out) || out[i] > elem[i]))
                                    out[i] = elem[i];
                            }
                        }
                    }
                    else {
                        out = {};
                        groupByField && (out[groupByField] = elem[groupByField]);
                        for (var i in elem) {
                            if (groupByField != i && typeof elem[i] == 'number' && (!opc || ((!opc.filtroCampos || opc.filtroCampos.indexOf(i) != -1) && (!opc.exclude || opc.exclude.indexOf(i) == -1)))) {
                                out[i] = elem[i];
                            }
                        }
                    }
                });
                return out;
            };
            if (groupByField == null)
                return sumarizarSubSet(this);
            var subsets = this.groupBy(groupByField);
            for (var i in subsets) {
                result.push(sumarizarSubSet(subsets[i]));
            }
            return result;
        };
        /**
        Promedio de los elementos.
    
        Cada elemento de el array de retorno tiene además la propiedad '[[cantidad]]' que indica la cantidad de elementos de ese subconjunto.
        @method avg
        @param {Mixed} opciones
        @param {Mixed} opciones.groupBy Si se van a agrupar los elementos
        @param {Array de strings} opciones.exclude Si no se quiere sumarizar algunos campos
        @param {Array de strings} opciones.filtroCampos Si se quiere especificar en cuales campos se va a sumarizar
        */
        Collection.prototype.avg = function (opc) {
            var that = this;
            var suma = this.sum(opc);
            for (var fila in suma) {
                for (var campo in suma[fila]) {
                    if (campo == '[[cantidad]]' || campo == opc.groupBy)
                        continue;
                    suma[fila][campo] /= suma[fila]['[[cantidad]]'];
                }
            }
            return suma;
        };
        Collection.prototype.take = function (cantidad, from) {
            if (from === void 0) { from = 0; }
            var ret = [];
            this.takeInto(ret, cantidad, from);
            return ret;
        };
        Collection.prototype.takeInto = function (destino, cantidad, from) {
            if (from === void 0) { from = 0; }
            var hasta = Math.min(this.array.length + cantidad, this.array.length);
            from = mz.intval(from);
            var outer_i = 0;
            for (var i = from; i < hasta; i++)
                destino.push(this.array[i]);
            return this;
        };
        Collection.prototype.swapItems = function (primero, segundo) {
            var viejo = this.array[segundo];
            this.array[segundo] = this.array[primero];
            this.array[primero] = viejo;
            this._reindizar();
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.CollectionSorted);
            this.emit(Collection.EVENTS.Changed, 'swap', primero, segundo);
            return this;
        };
        Collection.prototype.count = function (groupBy) {
            var fn;
            if (typeof groupBy == 'function') {
                fn = groupBy;
            }
            var result = [];
            var that = this;
            if (fn) {
                var grupos = {};
                this.forEach(function (elem) {
                    var gb = fn(elem);
                    if (!(gb in grupos)) {
                        var obj = {
                            'Count': 0
                        };
                        obj['[[cantidad]]'] = 0;
                        grupos[gb] = obj;
                    }
                    grupos[gb]['[[cantidad]]']++;
                });
                for (var i in grupos) {
                    grupos[i].Count = grupos[i]['[[cantidad]]'];
                    grupos[i][groupBy.toString()] = i;
                    result.push(grupos[i]);
                }
            }
            else {
                var out = {
                    Count: 0
                };
                out['[[cantidad]]'] = this.array.length;
                out.Count = out['[[cantidad]]'];
                result.push(out);
            }
            return result;
        };
        /** Reverses the actual collections order */
        Collection.prototype.reverse = function () {
            this.array.reverse();
            this.emit(Collection.EVENTS.CollectionSorted);
            this.emit(Collection.EVENTS.Changed, Collection.EVENTS.CollectionSorted);
        };
        /**
         * Mergea una colección contra un array o colección. cuando eliminarNoMatcheados == true, Hace una intersección
         * - Merged = (Original ∈ New) + (New ∉ Original)
         * En todos los casos se va a llamar un evento changed del tipo insert_at, set_at o remove_at dependiendo de la operación.
         */
        Collection.prototype.mergeArray = function (array, eliminarNoMatcheados) {
            var _this = this;
            var ret = {
                added: [],
                removed: [],
                merged: []
            };
            if (this.opciones.key) {
                var keys = {};
                //array.forEach(function(elem, index) {
                for (var index in array) {
                    var elem = array[index];
                    if (!(this.opciones.key in elem)) {
                        throw new TypeError("El elemento no contiene la clave primaria");
                    }
                    var indice = this.indexedGetIndex(elem[this.opciones.key]);
                    keys[elem[this.opciones.key]] = true;
                    if (indice != -1) {
                        mz.copy(this.array[indice], elem);
                        this.updateIndex(indice);
                        ret.merged.push(this.array[indice]);
                    }
                    else {
                        this.push(elem);
                        ret.added.push(elem);
                    }
                }
                //});
                if (eliminarNoMatcheados) {
                    ret.removed = this.remove(function (elem) {
                        return !(elem[_this.opciones.key] in keys);
                    });
                }
            }
            else
                console.error("You cannot mergeArray if the collection does not have 'key'");
            return ret;
        };
        Collection.prototype.createView = function () {
            return new CollectionView(this, mz.copy(this.opciones));
        };
        /**
         * Usar con cuidado.
         */
        Collection.prototype.getPrivateArray = function () { return this.array; };
        Collection.EVENTS = mz.copy({
            BeforeClearCollection: 'pre_clear',
            AfterClearCollection: 'clear',
            Changed: 'changed',
            ElementInserted: 'insert_at',
            ElementChanged: 'set_at',
            ElementRemoved: 'remove_at',
            ElementRangeInserted: 'addRange',
            CollectionSorted: 'sorted',
            ElementRangeRemoved: 'removed'
        }, mz.MVCObject.EVENTS);
        __decorate([
            mz.MVCObject.proxy, 
            __metadata('design:type', Boolean)
        ], Collection.prototype, "agregandoLote", void 0);
        return Collection;
    })(mz.MVCObject);
    mz.Collection = Collection;
    var CollectionView = (function (_super) {
        __extends(CollectionView, _super);
        function CollectionView(base, opc) {
            var _this = this;
            _super.call(this, null, opc);
            this.set('filter', null);
            this.set('order', null);
            this.on('order_changed', function (nuevo, viejo) {
                _this._handleChanged('order', nuevo, viejo);
            });
            this.attachTo(base);
        }
        CollectionView.prototype.filter_changed = function (nuevo, viejo) {
            nuevo = nuevo || null;
            if (nuevo != null && typeof nuevo !== "function")
                throw mz.MVCObject.Exception_RollbackOperation;
            this._handleChanged('filter', nuevo, viejo);
            return nuevo;
        };
        CollectionView.prototype._handleChanged = function (tipo, nuevo, viejo) {
            var necesitoReOrdenar = tipo == 'order' || tipo == Collection.EVENTS.CollectionSorted || tipo == 'insert_at' || tipo == 'set_at' || tipo == 'addRange';
            if (tipo == 'clear') {
                this.clear();
                necesitoReOrdenar = false;
            }
            if (tipo == 'addRange' || tipo == 'filter') {
                this._remake();
                necesitoReOrdenar = true;
            }
            if (necesitoReOrdenar) {
                this.resort();
            }
        };
        CollectionView.prototype._remake = function (noTriggerear) {
            if (this.key) {
                if (this.get('parent')) {
                    var arr = this.get('parent').getPrivateArray();
                    var filtro = this.get('filter');
                    var newArray = [];
                    if (filtro) {
                        for (var i = 0; i < arr.length; i++) {
                            if (filtro(arr[i]))
                                newArray.push(arr[i]);
                        }
                    }
                    else
                        newArray = arr;
                    if (newArray.length == 0 && this.length != 0) {
                        this.clear();
                        return;
                    }
                    var result = this.mergeArray(newArray, true);
                    // if we do not add any values, then tecnically we dont have to resort the array in case of deterministic sorts
                    if (!result.added || !result.added.length)
                        return;
                }
                else {
                    this.clear();
                }
            }
            else {
                this.clear(noTriggerear);
                if (this.get('parent')) {
                    var arr = this.get('parent').getPrivateArray();
                    var filtro = this.get('filter');
                    if (filtro) {
                        for (var i = 0; i < arr.length; i++) {
                            if (filtro(arr[i]))
                                this.push(arr[i], noTriggerear);
                        }
                    }
                    else {
                        for (var i = 0; i < arr.length; i++) {
                            this.push(arr[i], noTriggerear);
                        }
                    }
                }
            }
            this.resort();
        };
        CollectionView.prototype.resort = function () {
            var orden = this.get('order');
            if (orden) {
                var vieja = [];
                for (var i in this.array)
                    vieja[i] = this.array[i];
                var fn = orden.q ? mz.data.order.build(orden.q) : null;
                if (fn) {
                    if (orden.desc)
                        this.array.sort(function (a, b) {
                            return -fn(a, b);
                        });
                    else
                        this.array.sort(fn);
                }
                else {
                    this.array.sort();
                    orden.desc && this.array.reverse();
                }
                for (var i in this.array) {
                    if (this.array[i] !== vieja[i]) {
                        this._reindizar();
                        this.emit(Collection.EVENTS.CollectionSorted, orden.q, orden.desc ? 'DESC' : 'ASC');
                        this.emit(Collection.EVENTS.Changed, Collection.EVENTS.CollectionSorted, orden.q);
                        break;
                    }
                }
            }
        };
        CollectionView.prototype.refresh = function () {
            this._remake();
        };
        CollectionView.prototype.filter = function (filter) {
            this.set('filter', filter && filter.bind(this) || null);
            return this;
        };
        CollectionView.prototype.orderBy = function (q) {
            this.set('order', {
                q: q,
                desc: false
            });
            return this;
        };
        CollectionView.prototype.orderByDesc = function (q) {
            this.set('order', {
                q: q,
                desc: true
            });
            return this;
        };
        CollectionView.prototype.attachTo = function (obj) {
            this.detach();
            this.set('bindeosParent', []);
            this.set('parent', obj);
            if (obj) {
                var that = this;
                this.key = obj.key;
                this.get('bindeosParent').push(obj.on(Collection.EVENTS.AfterClearCollection, function () {
                    that.clear();
                }));
                this.get('bindeosParent').push(obj.on(Collection.EVENTS.BeforeClearCollection, function (noPropagado) {
                    that.trigger(CollectionView.EVENTS.BeforeClearCollection, noPropagado);
                }));
                this.get('bindeosParent').push(obj.on('changed', function (tipo, a1, a2) {
                    if ((tipo == Collection.EVENTS.ElementInserted || tipo == Collection.EVENTS.ElementChanged) && obj.agregandoLote)
                        return;
                    var filter = that.get('filter');
                    if (tipo == Collection.EVENTS.ElementInserted || tipo == Collection.EVENTS.ElementChanged || tipo == Collection.EVENTS.ElementRemoved) {
                        var indice = that.indexOf(a2);
                        if (!filter || filter(a2)) {
                            switch (tipo) {
                                case Collection.EVENTS.ElementInserted:
                                    if (indice == -1) {
                                        that.push(a2);
                                        that.resort();
                                    }
                                    return;
                                case Collection.EVENTS.ElementChanged:
                                    if (indice != -1) {
                                        that.updateIndex(indice);
                                    }
                                    else {
                                        that.push(a2);
                                    }
                                    that.resort();
                                    return;
                                case Collection.EVENTS.ElementRemoved:
                                    if (indice != -1) {
                                        that.removeAt(indice);
                                        return;
                                    }
                            }
                        }
                        else {
                            if (indice != -1) {
                                that.removeAt(indice);
                                return;
                            }
                        }
                    }
                    if (tipo == 'refresh') {
                        that._remake();
                        return;
                    }
                    that._handleChanged.apply(that, arguments);
                }));
                this._remake();
            }
        };
        CollectionView.prototype.detach = function () {
            if (this.get('bindeosParent') && this.get('parent')) {
                this.clear();
                var bindeos = this.get('bindeosParent');
                for (var i in bindeos)
                    bindeos[i].off();
                bindeos.length = 0;
                this.set('bindeosParent', null);
                this.set('parent', null);
            }
        };
        return CollectionView;
    })(Collection);
    mz.CollectionView = CollectionView;
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
var Reflect;
(function (Reflect) {
    var originalMetadata = Reflect.metadata;
    Reflect.MetadataInfo = Symbol("mz.metadata.typings");
    var valueSetter = {
        enumerable: false,
        writable: false,
        configurable: false,
        value: null
    };
    function metadata(metadataKey, metadataValue) {
        if ('design:type' == metadataKey) {
            if (typeof Reflect.MetadataInfo == "string") {
                return function decorator(target, targetKey) {
                    var typings = target[Reflect.MetadataInfo];
                    if (!typings) {
                        typings = setObjectSymbol(target, Reflect.MetadataInfo, {});
                    }
                    typings[targetKey] = metadataValue;
                    originalMetadata && originalMetadata(metadataKey, metadataValue).apply(this, arguments);
                };
            }
            else {
                return function decorator(target, targetKey) {
                    var typings = (target[Reflect.MetadataInfo] = target[Reflect.MetadataInfo] || {});
                    typings[targetKey] = metadataValue;
                    originalMetadata && originalMetadata(metadataKey, metadataValue).apply(this, arguments);
                };
            }
        }
        else
            return originalMetadata && originalMetadata(metadataKey, metadataValue) || undefined;
    }
    Reflect.metadata = metadata;
    function setObjectSymbol(target, symbol, value) {
        if (typeof symbol == "symbol") {
            target[symbol] = value;
        }
        else {
            valueSetter.value = value;
            Object.defineProperty(target, symbol.toString(), valueSetter);
        }
        return value;
    }
    Reflect.setObjectSymbol = setObjectSymbol;
    Reflect.getPropertyDescriptor = Object["getPropertyDescriptor"] || (function () {
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        return Object["getPropertyDescriptor"] = function getPropertyDescriptor(o, name) {
            var proto = o, descriptor;
            while (proto && !(descriptor = getOwnPropertyDescriptor(proto, name)))
                proto = proto.__proto__;
            return descriptor;
        };
    })();
    function getPrototypeOf(object) {
        if (Object.getPrototypeOf) {
            return Object.getPrototypeOf(object);
        }
        else {
            return object['__proto__'];
        }
    }
    Reflect.getPrototypeOf = getPrototypeOf;
})(Reflect || (Reflect = {}));
/// <reference path="AMD/Require.ts" />
var mz;
(function (mz) {
    mz.route = {
        start: function (options, cb) {
            var gotBackbone = function (b) {
                mz.route = mz.route = new (b.Router.extend(options))();
                b.history.start();
                mz.route.start = function (a, b) {
                    b && b(mz.route);
                };
                console.log("Backbone loaded! Route started!", mz.route);
                cb && cb(mz.route);
            };
            mz.globalContext.Backbone && gotBackbone(mz.globalContext.Backbone) || mz.require("backbone", function (b) { return gotBackbone(b); });
        }
    };
})(mz || (mz = {}));
/// <reference path="../mz.ts" />
var mz;
(function (mz) {
    var css;
    (function (css) {
        var _estilos_guardados = {};
        var _hoja_estilo = $('<link rel="stylesheet" type="text/css">');
        $(function () {
            _hoja_estilo.appendTo("body");
        });
        var _acum_estilos = (Math.random() * 32565) | 0;
        var _reescribir_css = mz.delayer(function () {
            var buffer = '';
            for (var i in _estilos_guardados) {
                buffer += i + ' {';
                for (var e in _estilos_guardados[i]) {
                    var value = _estilos_guardados[i][e];
                    if (typeof value === "number" && !jQuery.cssNumber[e]) {
                        value += "px";
                    }
                    buffer += e + ': ' + value + ';';
                }
                buffer += '}';
            }
            _hoja_estilo.attr('href', 'data:text/css;base64,' + btoa(buffer));
        }, 16);
        function set(selectorOrValues, selectorValues) {
            var nueva = false;
            var nombre_clase = '';
            if (!isDef(selectorValues)) {
                if (mz.isIterable(selectorOrValues)) {
                    var array_clases = [];
                    for (var i in selectorOrValues) {
                        if (typeof selectorOrValues[i] != "object") {
                            nueva = true;
                            break;
                        }
                        mz.copy(_estilos_guardados[i] = (_estilos_guardados[i] || {}), selectorOrValues[i]);
                        array_clases.push(i);
                    }
                    nombre_clase = array_clases.join(" ");
                }
                if (nueva === true) {
                    nombre_clase = '.-mzcss-' + (_acum_estilos++).toString(32);
                    set(nombre_clase, selectorOrValues);
                }
            }
            else {
                nombre_clase = selectorOrValues;
                mz.copy(_estilos_guardados[selectorOrValues] = (_estilos_guardados[selectorOrValues] || {}), selectorValues);
            }
            _reescribir_css();
            if (nombre_clase.indexOf(".") != -1) {
                return nombre_clase.replace(".", "");
            }
            else {
                return null;
            }
        }
        css.set = set;
        var Stylesheet = (function () {
            function Stylesheet(prefix) {
                var _this = this;
                this.prefix = null;
                this.elem = $('<link rel="stylesheet" type="text/css">');
                this.estilo = {};
                this.remake = null;
                this.destino = 'head';
                if (prefix instanceof jQuery) {
                    this.destino = prefix;
                    prefix = ':host';
                }
                this.prefix = prefix;
                $(function () {
                    _this.enable();
                });
            }
            Stylesheet.prototype.enable = function () {
                this.elem.appendTo(this.destino);
            };
            Stylesheet.prototype.disable = function () {
                this.elem.remove();
            };
            Stylesheet.prototype.refresh = function () {
                if (!this.remake) {
                    var that = this;
                    this.remake = mz.delayer(function () {
                        var buffer = '';
                        for (var i in that.estilo) {
                            buffer += (that.prefix ? that.prefix + ' ' : '') + i + ' {';
                            for (var e in that.estilo[i]) {
                                var value = that.estilo[i][e];
                                if (typeof value === "number" && !jQuery.cssNumber[e]) {
                                    value += "px";
                                }
                                buffer += e + ': ' + value + ';';
                            }
                            buffer += '}';
                        }
                        that.elem.attr('href', 'data:text/css;base64,' + btoa(buffer));
                    }, 9);
                }
                this.remake();
            };
            Stylesheet.prototype.set = function (property, val) {
                this.estilo[property] = this.estilo[property] || {};
                mz.copy(this.estilo[property], val);
                this.refresh();
            };
            return Stylesheet;
        })();
        css.Stylesheet = Stylesheet;
    })(css = mz.css || (mz.css = {}));
})(mz || (mz = {}));
/// <reference path="../VIEW/Widget.ts" />
/// <reference path="../VIEW/CSS.ts" />
var uikit;
(function (uikit) {
    var flexStyles = new mz.css.Stylesheet();
    flexStyles.disable();
    flexStyles.set('.mz-hidden, [hidden]', {
        'display': 'none!important'
    });
    flexStyles.set('.mz-flex-row', {
        'display': 'flex',
        '-webkit-flex-wrap': 'wrap',
        '-ms-flex-wrap': 'wrap',
        'flex-wrap': 'wrap',
        'width': '100%',
        '-webkit-box-sizing': 'border-box',
        '-moz-box-sizing': 'border-box',
        'box-sizing': 'border-box'
    });
    flexStyles.set('.mz-flex-col', {
        '-webkit-box-flex': '1',
        '-webkit-flex': '1',
        '-moz-box-flex': '1',
        '-moz-flex': '1',
        '-ms-flex': '1',
        'flex': '1',
        'display': 'flex',
        'width': '100%',
        '-webkit-box-sizing': 'border-box',
        '-moz-box-sizing': 'border-box',
        'box-sizing': 'border-box',
        '-webkit-flex-direction': 'column',
        'flex-direction': 'column',
        'position': 'relative'
    });
    flexStyles.set('.mz-flex-cell', {
        '-webkit-flex': 'auto',
        '-moz-box-flex': 'auto',
        '-moz-flex': 'auto',
        '-ms-flex': '1 1 auto',
        'flex': 'auto'
    });
    flexStyles.enable();
    var Fit = (function (_super) {
        __extends(Fit, _super);
        function Fit() {
            _super.apply(this, arguments);
        }
        Fit.prototype.class_changed = function () {
            this.rootNode.classList.add('mz-fit');
        };
        Fit = __decorate([
            mz.Widget.RegisterComponent("fit"),
            mz.Widget.Template("<div class=\"mz-fit\" />", ':root'),
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [])
        ], Fit);
        return Fit;
    })(mz.Widget);
    uikit.Fit = Fit;
    var Clear = (function (_super) {
        __extends(Clear, _super);
        function Clear(n, attr, a, b, c) {
            attr["tag"] = "div";
            _super.call(this, n, attr, a, b, c);
            this.DOM.addClass("clear");
        }
        Clear = __decorate([
            mz.Widget.RegisterComponent("clear"), 
            __metadata('design:paramtypes', [Object, Object, Object, Object, Object])
        ], Clear);
        return Clear;
    })(mz.Widget);
    uikit.Clear = Clear;
    var FlexCol = (function (_super) {
        __extends(FlexCol, _super);
        function FlexCol() {
            _super.apply(this, arguments);
        }
        FlexCol.prototype.style_changed = function () {
            this.set('col-width', this.get('col-width'));
        };
        FlexCol.prototype.class_changed = function () {
            this.rootNode.classList.add('mz-flex-col');
        };
        FlexCol.prototype['col-width_changed'] = function (width) {
            width = ('' + width).trim();
            width = width.match(/^\d+$/) ? width + '%' : width;
            var elem = this.rootNode;
            elem.style.webkitBoxFlex = '0';
            elem.style.webkitFlex = '0 0 ' + width;
            elem.style.mozBoxFlex = '0';
            elem.style.mozFlex = '0 0 ' + width;
            elem.style.msFlex = '0 0 ' + width;
            elem.style.flex = '0 0 ' + width;
            elem.style.maxWidth = width;
        };
        __decorate([
            mz.core.decorators.screenDelayer, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FlexCol.prototype, "style_changed", null);
        __decorate([
            mz.core.decorators.screenDelayer, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FlexCol.prototype, "class_changed", null);
        FlexCol = __decorate([
            mz.Widget.RegisterComponent("flex-col"),
            mz.Widget.Template("<div class=\"mz-flex-col\" />", ':root'),
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [])
        ], FlexCol);
        return FlexCol;
    })(mz.Widget);
    uikit.FlexCol = FlexCol;
    var FlexContainer = (function (_super) {
        __extends(FlexContainer, _super);
        function FlexContainer() {
            _super.apply(this, arguments);
        }
        FlexContainer.prototype.class_changed = function () {
            this.rootNode.classList.add('mz-flex-row');
        };
        __decorate([
            mz.core.decorators.screenDelayer, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FlexContainer.prototype, "class_changed", null);
        FlexContainer = __decorate([
            mz.Widget.RegisterComponent("flex-container"),
            mz.Widget.Template("<div class=\"mz-flex-row\" />", ':root'),
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [])
        ], FlexContainer);
        return FlexContainer;
    })(mz.Widget);
    uikit.FlexContainer = FlexContainer;
    var FlexRow = (function (_super) {
        __extends(FlexRow, _super);
        function FlexRow() {
            _super.apply(this, arguments);
        }
        FlexRow.prototype.class_changed = function () {
            this.rootNode.classList.add('mz-flex-row');
        };
        __decorate([
            mz.core.decorators.screenDelayer, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FlexRow.prototype, "class_changed", null);
        FlexRow = __decorate([
            mz.Widget.RegisterComponent("flex-row"),
            mz.Widget.Template("<div class=\"mz-flex-row\" />", ':root'),
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [])
        ], FlexRow);
        return FlexRow;
    })(mz.Widget);
    uikit.FlexRow = FlexRow;
    var FlexCell = (function (_super) {
        __extends(FlexCell, _super);
        function FlexCell() {
            _super.apply(this, arguments);
        }
        FlexCell.prototype.class_changed = function () {
            this.rootNode.classList.add('mz-flex-cell');
        };
        __decorate([
            mz.core.decorators.screenDelayer, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FlexCell.prototype, "class_changed", null);
        FlexCell = __decorate([
            mz.Widget.RegisterComponent("flex-cell"),
            mz.Widget.Template("<div class=\"mz-flex-cell\" />", ':root'),
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [])
        ], FlexCell);
        return FlexCell;
    })(mz.Widget);
    uikit.FlexCell = FlexCell;
})(uikit || (uikit = {}));
/// <reference path="../../mz.ts" />
/// <reference path="../Widget.ts" />
var MzModelDirective = (function (_super) {
    __extends(MzModelDirective, _super);
    function MzModelDirective() {
        _super.apply(this, arguments);
        this.delayedBinding = null;
    }
    MzModelDirective.getSelectedOptionScope = function (HtmlSelect) {
        var actualVal = HtmlSelect.find('option:selected')[0] || HtmlSelect.find('option:first')[0];
        if (!actualVal)
            actualVal = null;
        else
            actualVal = actualVal.$scope || null;
        return actualVal;
    };
    MzModelDirective.getOptionWithScope = function (HtmlSelect, scope) {
        var actualVal = HtmlSelect.find('option');
        for (var index = 0; index < actualVal.length; index++) {
            var element = actualVal[index];
            if (element.$scope == scope)
                return element;
        }
    };
    MzModelDirective.prototype.unmount = function () {
        this.teardown();
        _super.prototype.unmount.call(this);
    };
    MzModelDirective.prototype.teardown = function () {
        this.delayedBinding && this.widget.DOM.off(MzModelDirective.jqueryBindings, this.delayedBinding);
        this.componentBinding && this.componentBinding.off();
        this.componentBinding = null;
        this.delayedBinding = null;
    };
    MzModelDirective.prototype.changed = function (destinationField, prevVal) {
        var _this = this;
        this.teardown();
        if (destinationField.length == 0)
            return;
        var match;
        var listenVar = destinationField;
        if (match = MzModelDirective.point_expr.exec(destinationField)) {
            this.setter = function (value) {
                var obj = this.component[match[1]] || {};
                obj[match[2]] = value;
                this.component[match[1]] = obj;
                this.touch();
            };
            this.touch = function () {
                this.component.touch(match[1]);
            };
            this.getter = function () {
                var obj = this.component[match[1]] || {};
                return obj[match[2]];
            };
            listenVar = match[1];
        }
        else {
            this.setter = function (v) {
                this.component[destinationField] = v;
            };
            this.getter = function () {
                return this.component[destinationField];
            };
            this.touch = function () {
                this.component.touch(destinationField);
            };
        }
        if (this.widget instanceof mz.widgets.MzInput) {
            this.widgetValueBinding = this.widget.on("value_changed", function (newVal) {
                if (newVal != _this.getter())
                    _this.setter(newVal);
                else
                    _this.touch();
            });
            this.componentBinding = this.component.on(listenVar + "_changed", function () {
                var actualVal = _this.widget.value;
                var newVal = _this.getter();
                if (actualVal != newVal)
                    _this.widget.value = newVal;
            });
        }
        else if (this.widget.rootNode.nodeName.toUpperCase() == 'INPUT' || this.widget.rootNode.nodeName.toUpperCase() == 'SELECT') {
            var inputType = this.widget.rootNode.nodeName.toUpperCase() == 'SELECT' ? 'select' : mz.dom.adapter.getAttribute(this.widget.rootNode, "type") || "text";
            inputType = inputType.toUpperCase();
            if (inputType == "CHECKBOX") {
                this.delayedBinding = function () {
                    var actualVal = !!_this.widget.rootNode.checked;
                    if (actualVal != CBool(_this.getter()))
                        _this.setter(actualVal);
                    else
                        _this.touch();
                };
                // detecto los cambios
                this.changeBinding = this.widget.DOM.on("changed mouseup keyup", this.delayedBinding);
                this.componentBinding = this.component.on(listenVar + "_changed", function () {
                    var actualVal = !!_this.widget.rootNode.checked;
                    var newVal = CBool(_this.getter());
                    if (actualVal != newVal)
                        _this.widget.rootNode.checked = CBool(newVal);
                });
            }
            else if (inputType == "SELECT") {
                this.delayedBinding = function () {
                    var actualVal = MzModelDirective.getSelectedOptionScope(_this.widget.DOM);
                    if (actualVal != _this.getter())
                        _this.setter(actualVal);
                    else
                        _this.touch();
                };
                // detecto los cambios
                this.changeBinding = this.widget.DOM.on(MzModelDirective.jqueryBindings, this.delayedBinding);
                this.componentBinding = this.component.on(listenVar + "_changed", function () {
                    var actualVal = MzModelDirective.getSelectedOptionScope(_this.widget.DOM);
                    var newVal = _this.getter();
                    if (actualVal != newVal && (!newVal || newVal.toString() != actualVal)) {
                        _this.widget.DOM.find('option').removeProp('selected').removeAttr('selected');
                        var foundOption = MzModelDirective.getOptionWithScope(_this.widget.DOM, newVal);
                        if (foundOption)
                            $(foundOption).attr('selected', 'selected').prop('selected', true);
                    }
                });
            }
            else {
                this.delayedBinding = function () {
                    var actualVal = _this.widget.DOM.val();
                    if (actualVal != _this.getter())
                        _this.setter(actualVal);
                    else
                        _this.touch();
                };
                // detecto los cambios
                this.changeBinding = this.widget.DOM.on(MzModelDirective.jqueryBindings, this.delayedBinding);
                this.componentBinding = this.component.on(listenVar + "_changed", function () {
                    var actualVal = _this.widget.DOM.val();
                    var newVal = _this.getter();
                    if (actualVal != newVal && (!newVal || newVal.toString() != actualVal))
                        _this.widget.DOM.val(newVal);
                });
            }
        }
        this.touch();
    };
    MzModelDirective.symbol2wb = Symbol("mz-model-binding");
    MzModelDirective.jqueryBindings = 'changed keyup paste lostfocus search';
    MzModelDirective.point_expr = /^([a-zA-Z0-9_$]+)\.(.*)$/;
    MzModelDirective = __decorate([
        /// <reference path="../../mz.ts" />
        mz.AttributeDirective.Register("mz-model"), 
        __metadata('design:paramtypes', [])
    ], MzModelDirective);
    return MzModelDirective;
})(mz.AttributeDirective);
var mz;
(function (mz) {
    var widgets;
    (function (widgets) {
        var MzInput = (function (_super) {
            __extends(MzInput, _super);
            function MzInput() {
                _super.apply(this, arguments);
            }
            MzInput.prototype.focus = function () {
                if (this.rootNode instanceof HTMLElement) {
                    this.rootNode.focus();
                }
            };
            MzInput.prototype.isValid = function () {
                return true;
            };
            __decorate([
                mz.Widget.proxy, 
                __metadata('design:type', Object)
            ], MzInput.prototype, "value", void 0);
            __decorate([
                mz.Widget.Attribute, 
                __metadata('design:type', Boolean)
            ], MzInput.prototype, "disabled", void 0);
            __decorate([
                mz.Widget.Attribute, 
                __metadata('design:type', Boolean)
            ], MzInput.prototype, "required", void 0);
            __decorate([
                mz.Widget.Attribute, 
                __metadata('design:type', Boolean)
            ], MzInput.prototype, "visible", void 0);
            MzInput = __decorate([
                mz.Widget.RegisterComponent('mz-input'), 
                __metadata('design:paramtypes', [])
            ], MzInput);
            return MzInput;
        })(mz.Widget);
        widgets.MzInput = MzInput;
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));
/// <reference path="../Widget.ts" />
var MzRawDirective = (function (_super) {
    __extends(MzRawDirective, _super);
    function MzRawDirective() {
        _super.apply(this, arguments);
    }
    MzRawDirective.prototype.changed = function (val) {
        this.widget.contentNode.innerHTML = val;
    };
    MzRawDirective = __decorate([
        /// <reference path="../Widget.ts" />
        mz.AttributeDirective.Register("mz-raw"), 
        __metadata('design:paramtypes', [])
    ], MzRawDirective);
    return MzRawDirective;
})(mz.AttributeDirective);
var MzClassNameDirective = (function (_super) {
    __extends(MzClassNameDirective, _super);
    function MzClassNameDirective() {
        _super.apply(this, arguments);
    }
    MzClassNameDirective.prototype.changed = function (value, prevVal) {
        if (this.widget.rootNode.className != value)
            this.widget.rootNode.className = value;
        //mz.dom.microqueue.setAttribute(this.widget.rootNode, 'class', value);
    };
    MzClassNameDirective = __decorate([
        mz.AttributeDirective.Register("class"), 
        __metadata('design:paramtypes', [])
    ], MzClassNameDirective);
    return MzClassNameDirective;
})(mz.AttributeDirective);
/// <reference path="../Widget.ts" />
/// <reference path="className.ts" />
var MzVisibleDirective = (function (_super) {
    __extends(MzVisibleDirective, _super);
    function MzVisibleDirective() {
        _super.apply(this, arguments);
    }
    MzVisibleDirective.prototype.mount = function () {
        var _this = this;
        this.listener = this.widget.on('class_changed', function () { return _this.changed(_this.value); });
    };
    MzVisibleDirective.prototype.unmount = function () {
        this.listener.off();
        this.listener = null;
    };
    MzVisibleDirective.prototype.changed = function (val) {
        if (CBool(val)) {
            mz.dom.adapter.removeClass(this.widget.rootNode, MzVisibleDirective.vendorHiddenClass);
            try {
                mz.dom.adapter.removeAttribute(this.widget.rootNode, 'aria-hidden');
            }
            catch (e) { }
            try {
                mz.dom.adapter.removeAttribute(this.widget.rootNode, mz.HIDDEN_PROP);
            }
            catch (e) { }
            this._value = true;
        }
        else {
            mz.dom.adapter.addClass(this.widget.rootNode, MzVisibleDirective.vendorHiddenClass);
            try {
                mz.dom.adapter.setAttribute(this.widget.rootNode, 'aria-hidden', 'true');
            }
            catch (e) { }
            try {
                mz.dom.adapter.setAttribute(this.widget.rootNode, mz.HIDDEN_PROP, mz.HIDDEN_PROP);
            }
            catch (e) { }
            this._value = false;
        }
    };
    MzVisibleDirective.vendorHiddenClass = 'mz-hidden';
    MzVisibleDirective = __decorate([
        /// <reference path="../Widget.ts" />
        mz.AttributeDirective.Register("visible"), 
        __metadata('design:paramtypes', [])
    ], MzVisibleDirective);
    return MzVisibleDirective;
})(mz.AttributeDirective);
var mz;
(function (mz) {
    var view;
    (function (view) {
        function html(literalSections) {
            var substs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                substs[_i - 1] = arguments[_i];
            }
            // Use raw literal sections: we don’t want
            // backslashes (\n etc.) to be interpreted
            var raw = literalSections.raw;
            var result = '';
            substs.forEach(function (subst, i) {
                // Retrieve the literal section preceding
                // the current substitution
                var lit = raw[i];
                // In the example, map() returns an array:
                // If substitution is an array (and not a string),
                // we turn it into a string
                if (Array.isArray(subst)) {
                    subst = subst.join('');
                }
                // If the substitution is preceded by a dollar sign,
                // we dont escape special characters in it
                if (!lit.endsWith('$')) {
                    subst = html.escape(subst);
                }
                else {
                    lit = lit.slice(0, -1);
                }
                result += lit;
                result += subst;
            });
            // Take care of last literal section
            // (Never fails, because an empty template string
            // produces one literal section, an empty string)
            result += raw[raw.length - 1]; // (A)
            return result;
        }
        view.html = html;
    })(view = mz.view || (mz.view = {}));
})(mz || (mz = {}));
var mz;
(function (mz) {
    var view;
    (function (view) {
        var html;
        (function (html) {
            function escape(str) {
                if (str === undefined || str == null)
                    return '';
                if (str === false || str === false)
                    return str ? 'true' : 'false';
                return str && (str = str.toString()) && str.replace(/&/g, '&amp;') // first!
                    .replace(/>/g, '&gt;')
                    .replace(/</g, '&lt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/`/g, '&#96;');
            }
            html.escape = escape;
        })(html = view.html || (view.html = {}));
    })(view = mz.view || (mz.view = {}));
})(mz || (mz = {}));
/// <reference path="Widget.ts" />
var mz;
(function (mz) {
    var vdom;
    (function (vdom) {
        function createElement(type, props) {
            var children = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                children[_i - 2] = arguments[_i];
            }
            var ctor = null;
            if (typeof type === "string") {
                ctor = mz.widgets.BaseElement;
                var typeStr = type.toLowerCase();
                if (typeStr in mz.widgets)
                    ctor = mz.widgets[typeStr];
                if (props && props instanceof Array && !children)
                    children = props;
                props = null;
            }
            else
                ctor = type;
            return new ctor(null, props || {}, children || []);
        }
        vdom.createElement = createElement;
        vdom.__spread = mz.copy;
    })(vdom = mz.vdom || (mz.vdom = {}));
})(mz || (mz = {}));
var mz;
(function (mz) {
    /**
     * Hyperscript for JSX or TSX
     */
    function h(componentName, attr) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var clase = mz.widgets.BaseElement;
        componentName = componentName.toLowerCase();
        if (componentName in mz.widgets)
            clase = mz.widgets[componentName];
        if (attr && attr instanceof Array && !children)
            attr = children;
        return new clase(null, attr || {}, children || []);
    }
    mz.h = h;
})(mz || (mz = {}));
/// <reference path="../view/Widget.ts" />
var mz;
(function (mz) {
    var widgets;
    (function (widgets) {
        var localCssRe = /(:local)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))?([^,{]*)/gim; // http://regexper.com/
        function transformCssLocal(cssText, parentSelector) {
            return cssText.replace(localCssRe, function () {
                return parentSelector + ' ' + (arguments[2] || '') + (arguments[3] || '');
            });
        }
        var StyleComponent = (function (_super) {
            __extends(StyleComponent, _super);
            function StyleComponent(root, attr, children, params, parent, scope) {
                var _this = this;
                _super.call(this, root, attr, children, params, parent, scope);
                this.listening.push(parent.on('id_changed', function (val) {
                    _this.parent_selector = val;
                    _this.update();
                }));
                if ('MutationObserver' in mz.globalContext) {
                    this.observer = new MutationObserver(mz.screenDelayer(function () {
                        _this.update();
                    }));
                    // have the observer observe foo for changes in children
                    this.observer.observe(this.contentNode, { childList: true, subtree: true, characterData: true });
                }
                else {
                    this.listening.push(parent.on('valueChanged', function () { return _this.update(); }));
                }
                if (this.parent_selector = parent.attr('id')) {
                    this.update();
                }
                else {
                    parent.attr('id', this.parent_selector = mz.getDOMID());
                    this.update();
                }
                this.update = mz.screenDelayer(this.update, this);
            }
            StyleComponent.prototype.textValue_changed = function (val, prevVal) {
                if (val !== prevVal) {
                    var urlCss = 'data:text/css;base64,' + btoa(val);
                    this.link.attr('href', urlCss);
                }
            };
            StyleComponent.prototype.update = function () {
                this.textValue = transformCssLocal(this.contentNode.textContent, "#" + this.parent_selector);
            };
            __decorate([
                StyleComponent.proxy, 
                __metadata('design:type', String)
            ], StyleComponent.prototype, "textValue", void 0);
            StyleComponent = __decorate([
                StyleComponent.RegisterComponent('style'),
                StyleComponent.Template("\n<mz-style hidden=\"hidden\" aria-hidden=\"true\" style=\"display:none;\">\n    <link rel=\"stylesheet\" name=\"link\" />\n    <mz-style-content />\n</mz-style>\n", 'mz-style-content'),
                StyleComponent.ConfigureUnwrapped, 
                __metadata('design:paramtypes', [Object, Object, Object, Object, Object, Object])
            ], StyleComponent);
            return StyleComponent;
        })(mz.Widget);
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));
/// <reference path="../view/Widget.ts" />
var mz;
(function (mz) {
    var widgets;
    (function (widgets) {
        var MzForm = (function (_super) {
            __extends(MzForm, _super);
            function MzForm(rootNode, attr, children, b, c, scope) {
                attr['tag'] = attr['tag'] || 'form';
                this.flagAvoidReUpdate = null;
                _super.call(this, rootNode, attr, children, b, c, scope);
                this.children = this.generateScopedContent(scope);
                this.primaryButton = null;
                this.startComponent();
                this.contentNode = this.contentNode || this.rootNode;
                this.appendChildrens();
                this.defaults = {};
                this.campos = {};
                this.camposArray = [];
                this._findICampos(this);
                this.checkAll = mz.screenDelayer(this.checkAll, this);
            }
            MzForm.prototype.value_changed = function (val, prevVal) {
                if (!val || typeof val != "object") {
                    return this.getDefaultValue();
                }
                if (val && typeof val === "object" && !this.flagAvoidReUpdate) {
                    for (var i in this.campos) {
                        if (i !== this.flagAvoidReUpdate && this.campos[i].value !== val[i])
                            this.campos[i].value = val[i];
                    }
                }
                this.checkAll(true);
            };
            MzForm.prototype.adoptInput = function (fieldName, component) {
                var _this = this;
                this.campos[fieldName] = component;
                this.camposArray.push(component);
                var defValue = component.attr('default-value');
                if (typeof defValue != "undefined") {
                    this.defaults[fieldName] = defValue;
                }
                this.listening.push(component.on("value_changed", function (val) {
                    (_this.value || (_this.resetForm(), _this.value))[fieldName] = val;
                    _this.flagAvoidReUpdate = fieldName;
                    try {
                        _this.set('value', _this.value);
                    }
                    catch (e) {
                        console.error(e);
                    }
                    _this.flagAvoidReUpdate = null;
                }));
            };
            MzForm.prototype._findICampos = function (component) {
                var _this = this;
                if (component != this) {
                    if (component !== this) {
                        var fieldName = component.attr('field-name');
                        if (fieldName) {
                            this.adoptInput(fieldName, component);
                            return;
                        }
                    }
                    else {
                        if (component.rootNode && component.rootNode.nodeName.toLowerCase() == "button" && (component.attr('mz-form-primary') || component.attr('type') === "submit")) {
                            this.primaryButton = component;
                        }
                    }
                }
                component && component.children && component.children.forEach(function (c) {
                    if (c instanceof mz.Widget)
                        _this._findICampos(c);
                });
            };
            MzForm.prototype.fieldIsVisible = function (fieldName) {
                if (fieldName in this.campos) {
                    return this.campos[fieldName].visible;
                }
                return false;
            };
            MzForm.prototype.focus = function (field) {
                if (!field && this.camposArray.length)
                    this.camposArray[0].focus && this.camposArray[0].focus();
                else if (field && field in this.campos)
                    this.campos[field].focus && this.campos[field].focus();
            };
            MzForm.prototype.isValid = function () {
                this.errors = [];
                var cumple = true;
                var clase = MzForm.ERROR_CLASS;
                try {
                    clase = this.data['error-class'] || clase;
                }
                catch (e) {
                }
                for (var i in this.campos) {
                    if (this.campos[i] instanceof widgets.MzInput) {
                        var err = null;
                        try {
                            err = this.campos[i].isValid();
                        }
                        catch (e) {
                            err = e;
                        }
                        if (err === true) {
                            mz.dom.adapter.removeClass(this.campos[i].rootNode, clase);
                        }
                        else {
                            cumple = false;
                            mz.dom.adapter.addClass(this.campos[i].rootNode, clase);
                            if (typeof err === "string" || err instanceof Error) {
                                console.error(err, this);
                                this.errors.push(err);
                            }
                        }
                    }
                }
                this.primaryButton && this.primaryButton.attr('disabled', !cumple);
                return cumple;
            };
            MzForm.prototype.checkAll = function (noEmitAlert) {
                var cumple = this.isValid();
                if (this.errors.length) {
                    this.emit('error', this.errors);
                    return false;
                }
                return cumple;
            };
            MzForm.prototype.getDefaultValue = function () {
                var obj = {};
                for (var i in this.campos) {
                    obj[i] = this.defaults[i];
                }
                return obj;
            };
            MzForm.prototype.resetForm = function () {
                return this.value = this.getDefaultValue();
            };
            MzForm.ERROR_CLASS = 'has-error';
            __decorate([
                MzForm.proxy, 
                __metadata('design:type', Object)
            ], MzForm.prototype, "value", void 0);
            MzForm = __decorate([
                mz.Widget.RegisterComponent("mz-form"),
                mz.Widget.ConfigureUnwrapped, 
                __metadata('design:paramtypes', [HTMLElement, Object, Array, Object, Object, Object])
            ], MzForm);
            return MzForm;
        })(mz.widgets.MzInput);
        widgets.MzForm = MzForm;
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));
/// <reference path="../view/Widget.ts" />
var mz;
(function (mz) {
    var widgets;
    (function (widgets_1) {
        function delegateUnmountElement(widget) {
            if (widget && typeof widget == "object") {
                if ('unmount' in widget)
                    widget.unmount();
                else
                    widget.DOM && widget.DOM.remove();
            }
        }
        var MzRepeat = (function (_super) {
            __extends(MzRepeat, _super);
            //elementCache: mz.WeakMap<any, mz.Widget[]>;
            function MzRepeat(rootNode, attr, children, b, c, scope) {
                _super.call(this, rootNode, attr, [], b, c, scope);
                this.collectionKey = Symbol("mz-repeat-" + mz.genUID());
                this.ponerElem = this.ponerElem.bind(this);
                this.delegateUnmountElements = this.delegateUnmountElements.bind(this);
                // if the list contains elements.
                if (this.list && this.list.length) {
                    this.list.forEach(this.ponerElem);
                }
            }
            MzRepeat.prototype.list_changed = function (list, prevList) {
                var _this = this;
                if (list && list == prevList) {
                    if (list instanceof mz.Collection)
                        return;
                    this.redraw('refresh');
                    return;
                }
                if (this.listenersLista) {
                    this.listenersLista.forEach(function (x) { return x.off(); });
                    this.listenersLista.length = 0;
                }
                else if (list) {
                    this.listenersLista = [];
                }
                if (prevList && prevList != list) {
                    // clean current collection elements
                    prevList.forEach(this.delegateUnmountElements);
                    this.detachAllNodes();
                }
                else if (prevList != list) {
                    this.detachAllNodes();
                }
                if (this.list && list instanceof mz.Collection) {
                    this.listenersLista.push(this.list.on('changed', this.redraw.bind(this)));
                    this.listenersLista.push(this.list.on('pre_clear', function (a) { return _this.redraw('pre_clear', a); }));
                }
                if (this.list && this.list.length && !!this.collectionKey /* collection initialized */)
                    this.redraw('refresh');
            };
            MzRepeat.prototype.unmount = function () {
                this.list = null;
                _super.prototype.unmount.call(this);
            };
            MzRepeat.prototype.ponerElem = function (itemDeLista) {
                var dom = itemDeLista[this.collectionKey];
                var existia = !!dom;
                if (!existia) {
                    itemDeLista[this.collectionKey] = dom = this.generateScopedContent(itemDeLista);
                }
                if (existia) {
                    // si el elemento ya existia, llamo a refreshScope
                    for (var index = 0; index < dom.length; index++) {
                        var e = dom[index];
                        if (e && (typeof e == "object") && 'refreshScope' in e)
                            e.refreshScope();
                        this.append(e);
                    }
                }
                else {
                    for (var index = 0; index < dom.length; index++) {
                        this.append(dom[index]);
                    }
                }
            };
            MzRepeat.prototype.generateScopedContent = function (scope) {
                var t = _super.prototype.generateScopedContent.call(this, scope);
                this.afterAdd && this.afterAdd(t, scope);
                return t;
            };
            MzRepeat.prototype.detachAllNodes = function () {
                var child = null;
                while (child = this.contentNode.firstChild) {
                    this.contentNode.removeChild(child);
                }
            };
            MzRepeat.prototype.delegateUnmountElements = function (elementoLista, at) {
                if (elementoLista[this.collectionKey]) {
                    //elementoLista[this.collectionKey].forEach(delegateUnmountElement);
                    this.releaseScopedContent(elementoLista[this.collectionKey]);
                    delete elementoLista[this.collectionKey];
                }
            };
            MzRepeat.prototype.redraw = function (tipo, a, b) {
                var rebuild = !tipo;
                if (tipo == mz.Collection.EVENTS.ElementChanged && this.collectionKey in b) {
                    var widgets_2 = b[this.collectionKey];
                    for (var i = 0; i < widgets_2.length; i++) {
                        var e = widgets_2[i];
                        if (e && e.refreshScope) {
                            e.refreshScope();
                        }
                    }
                }
                else if (tipo == mz.Collection.EVENTS.ElementInserted || tipo == mz.Collection.EVENTS.ElementChanged) {
                    this.ponerElem(b);
                }
                else if (tipo == mz.Collection.EVENTS.ElementRemoved && b && b[this.collectionKey]) {
                    this.delegateUnmountElements(b);
                }
                else if (tipo == mz.Collection.EVENTS.CollectionSorted) {
                    rebuild = true;
                }
                else if (tipo == "refresh") {
                    this.detachAllNodes();
                    rebuild = true;
                }
                else if (tipo == mz.Collection.EVENTS.BeforeClearCollection) {
                    this.list.forEach(this.delegateUnmountElements);
                    return;
                }
                if (tipo == mz.Collection.EVENTS.AfterClearCollection || rebuild) {
                    this.detachAllNodes();
                }
                if (rebuild && this.list.length) {
                    this.list.forEach(this.ponerElem);
                }
            };
            __decorate([
                mz.MVCObject.proxy, 
                __metadata('design:type', Object)
            ], MzRepeat.prototype, "list", void 0);
            __decorate([
                mz.MVCObject.proxy, 
                __metadata('design:type', Function)
            ], MzRepeat.prototype, "afterAdd", void 0);
            MzRepeat = __decorate([
                mz.Widget.RegisterComponent("mz-repeat"),
                mz.Widget.ConfigureEmptyTag, 
                __metadata('design:paramtypes', [HTMLElement, Object, Array, Object, Object, Object])
            ], MzRepeat);
            return MzRepeat;
        })(mz.Widget);
        widgets_1.MzRepeat = MzRepeat;
    })(widgets = mz.widgets || (mz.widgets = {}));
})(mz || (mz = {}));



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXouanMiLCJzb3VyY2VzIjpbIm16LnRzIiwiVklFVy9UbXBsLnRzIiwiVklFVy9IZWxwZXJzLnRzIiwiQ09SRS9FdmVudERpc3BhdGNoZXIudHMiLCJDT1JFL01WQ09iamVjdC50cyIsIkNPUkUvRGVjb3JhdG9ycy50cyIsIlZJRVcvVGV4dE5vZGUudHMiLCJDT1JFL0RPTS50cyIsIkNPUkUvRE9NL0RPTS50cyIsIkNPUkUvRE9NL0RPTV9Ccm93c2VySW1wbC50cyIsIkNPUkUvRE9NL01pY3JvUXVldWUudHMiLCJWSUVXL1dpZGdldC50cyIsIldJREdFVFMvbXotc3dpdGNoZXIudHMiLCJBUFAvQXBwQ29udHJvbGxlci50cyIsIkFQUC9SZWR1eC50cyIsIkFVVEgvSldULnRzIiwiQ09SRS9JMThuLnRzIiwiQ09SRS9EYXRlLnRzIiwiQ09SRS9Qcm9taXNlLnRzIiwiQ09SRS9Yci50cyIsIkNPUkUvU3RyaW5ncy50cyIsIkFVVEgvT0F1dGgyLnRzIiwiQ09SRS9BTUQvUmVxdWlyZS50cyIsIkNPUkUvQU1EL01vZHVsZS50cyIsIkNPUkUvQU1EL0RlZmluZS50cyIsIkNPUkUvQU1EL1NldHVwLnRzIiwiQ09SRS9Db2xsZWN0aW9uLnRzIiwiQ09SRS9SZWZsZWN0aW9uLnRzIiwiQ09SRS9Sb3V0ZS50cyIsIlZJRVcvQ1NTLnRzIiwiVUlLSVQvQmxvY2tzLnRzIiwiVklFVy9ESVJFQ1RJVkVTL016TW9kZWwudHMiLCJWSUVXL0RJUkVDVElWRVMvTXpSYXcudHMiLCJWSUVXL0RJUkVDVElWRVMvY2xhc3NOYW1lLnRzIiwiVklFVy9ESVJFQ1RJVkVTL1Zpc2libGUudHMiLCJWSUVXL0h0bWxTYW5pdGl6ZXIudHMiLCJWSUVXL1RTWC50cyIsIldJREdFVFMvU3R5bGUudHMiLCJXSURHRVRTL216LWZvcm0udHMiLCJXSURHRVRTL216LXJlcGVhdC50cyJdLCJuYW1lcyI6WyJpc0RlZiIsIm16IiwibXouYWxpYXMiLCJtei5nZXRQYXRoIiwibXouZ2V0RWxlbWVudFBvc2l0aW9uIiwiZXh0ZW5kIiwibXouY29weSIsIm16Lm1hcFhJbnRvIiwibXoubWFwSW50byIsIm16LmlzSXRlcmFibGUiLCJtei50cmltIiwibXouZ2V0RE9NSUQiLCJtei5nZW5VSUQiLCJtei5kYXRhIiwibXouZGF0YS5vcmRlciIsIm16LmRhdGEub3JkZXIubnVsbF9hcnJpYmEiLCJtei5kYXRhLm9yZGVyLm51bGxfYWJham8iLCJtei5kYXRhLm9yZGVyLmJ1aWxkIiwibXouZXNjYXBlUmVnRXhwIiwibXoubG9hZENzcyIsIm16LmZuSW5mbyIsIm16LmNvbXBpbGVGaWx0ZXIiLCJtei5nZXRXaW5kb3dTaXplIiwibXouZ2xvYmFsQ2FsbGJhY2siLCJtei5idXNjYXJBcmd1bWVudG9UaXBvIiwibXoudmlldyIsIm16LnZpZXcudG1wbCIsIm16LnZpZXcudG1wbC5pbnRlcm5hbFRtcGwiLCJtei52aWV3LnRtcGwuZXhwciIsIm16LnZpZXcudG1wbC53cmFwIiwibXoudmlldy50bXBsLnNwbGl0IiwibXoudmlldy50bXBsLmV4dHJhY3QiLCJtei5nZXRIaWRkZW5Qcm9wIiwibXouZ2V0VHJhbnNmb3JtVGFnIiwibXouRXZlbnREaXNwYXRjaGVyQmluZGluZyIsIm16LkV2ZW50RGlzcGF0Y2hlckJpbmRpbmcuY29uc3RydWN0b3IiLCJtei5FdmVudERpc3BhdGNoZXJCaW5kaW5nLm9mZiIsIm16LkV2ZW50RGlzcGF0Y2hlckJpbmRpbmcuZW5hYmxlIiwibXouRXZlbnREaXNwYXRjaGVyQmluZGluZy5kaXNhYmxlIiwibXouRXZlbnREaXNwYXRjaGVyIiwibXouRXZlbnREaXNwYXRjaGVyLmNvbnN0cnVjdG9yIiwibXouRXZlbnREaXNwYXRjaGVyLm9uIiwibXouRXZlbnREaXNwYXRjaGVyLm9uY2UiLCJtei5FdmVudERpc3BhdGNoZXIub2ZmIiwibXouRXZlbnREaXNwYXRjaGVyLmNsZWFudXBUdXJuZWRPZmZFdmVudHMiLCJtei5FdmVudERpc3BhdGNoZXIuZW1pdCIsIm16Lk1WQ09iamVjdCIsIm16Lk1WQ09iamVjdC5jb25zdHJ1Y3RvciIsIm16Lk1WQ09iamVjdC5nZXRBbGwiLCJtei5NVkNPYmplY3Quc2V0VmFsdWVzIiwibXouTVZDT2JqZWN0LnNldCIsIm16Lk1WQ09iamVjdC5nZXQiLCJtei5NVkNPYmplY3QudG91Y2giLCJtei5NVkNPYmplY3QucHJveHkiLCJtei5jb3JlIiwibXouY29yZS5kZWNvcmF0b3JzIiwibXouY29yZS5kZWNvcmF0b3JzLkxvZ1Jlc3VsdCIsIm16LmNvcmUuZGVjb3JhdG9ycy5ub0VudW1lcmFibGUiLCJtei5jb3JlLmRlY29yYXRvcnMuZGVsYXllciIsIm16LmNvcmUuZGVjb3JhdG9ycy5zY3JlZW5EZWxheWVyIiwibXoud2lkZ2V0cyIsIm16LndpZGdldHMuVGV4dE5vZGUiLCJtei53aWRnZXRzLlRleHROb2RlLmNvbnN0cnVjdG9yIiwibXoud2lkZ2V0cy5UZXh0Tm9kZS5zZXR1cCIsIm16LndpZGdldHMuVGV4dE5vZGUudW5tb3VudCIsIm16LndpZGdldHMuVGV4dE5vZGUucmVmcmVzaFNjb3BlIiwibXoud2lkZ2V0cy5UZXh0Tm9kZS5yZXR1cm5Ub1BvbGwiLCJtei53aWRnZXRzLlRleHROb2RlLmdldEZyb21Qb2xsIiwibXouZG9tIiwibXouZG9tLnNldFJvb3REb21BZGFwdGVyIiwibXouZG9tLkFic3RyYWN0RG9tQWRhcHRlciIsIm16LmRvbS5BYnN0cmFjdERvbUFkYXB0ZXIuY29uc3RydWN0b3IiLCJtei5kb20uR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIiwibXouZG9tLkdlbmVyaWNCcm93c2VyRG9tQWRhcHRlci5jb25zdHJ1Y3RvciIsIm16LmRvbS5HZW5lcmljQnJvd3NlckRvbUFkYXB0ZXIuZ2V0RGlzdHJpYnV0ZWROb2RlcyIsIm16LmRvbS5HZW5lcmljQnJvd3NlckRvbUFkYXB0ZXIucmVzb2x2ZUFuZFNldEhyZWYiLCJtei5kb20uR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyLnN1cHBvcnRzRE9NRXZlbnRzIiwibXouZG9tLkdlbmVyaWNCcm93c2VyRG9tQWRhcHRlci5zdXBwb3J0c05hdGl2ZVNoYWRvd0RPTSIsIm16LmRvbS5HZW5lcmljQnJvd3NlckRvbUFkYXB0ZXIuZ2V0QW5pbWF0aW9uUHJlZml4IiwibXouZG9tLkdlbmVyaWNCcm93c2VyRG9tQWRhcHRlci5nZXRUcmFuc2l0aW9uRW5kIiwibXouZG9tLkdlbmVyaWNCcm93c2VyRG9tQWRhcHRlci5zdXBwb3J0c0FuaW1hdGlvbiIsIm16LmRvbS5HZW5lcmljQnJvd3NlckRvbUFkYXB0ZXIuZ2V0WEhSIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmNvbnN0cnVjdG9yIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnBhcnNlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmhhc1Byb3BlcnR5IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnNldFByb3BlcnR5IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldFByb3BlcnR5IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmludm9rZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5sb2dFcnJvciIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5sb2ciLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIubG9nR3JvdXAiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIubG9nR3JvdXBFbmQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuYXR0clRvUHJvcE1hcCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5xdWVyeSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5xdWVyeVNlbGVjdG9yIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnF1ZXJ5U2VsZWN0b3JBbGwiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIub24iLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIub25BbmRDYW5jZWwiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZGlzcGF0Y2hFdmVudCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5jcmVhdGVNb3VzZUV2ZW50IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmNyZWF0ZUV2ZW50IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnByZXZlbnREZWZhdWx0IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmlzUHJldmVudGVkIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldElubmVySFRNTCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5nZXRPdXRlckhUTUwiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIubm9kZU5hbWUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIubm9kZVZhbHVlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnR5cGUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY29udGVudCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5maXJzdENoaWxkIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLm5leHRTaWJsaW5nIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnBhcmVudEVsZW1lbnQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY2hpbGROb2RlcyIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5jaGlsZE5vZGVzQXNMaXN0IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmNsZWFyTm9kZXMiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuYXBwZW5kQ2hpbGQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIucmVtb3ZlQ2hpbGQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIucmVwbGFjZUNoaWxkIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnJlbW92ZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5pbnNlcnRCZWZvcmUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuaW5zZXJ0QWxsQmVmb3JlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmluc2VydEFmdGVyIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnNldElubmVySFRNTCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5nZXRUZXh0IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnNldFRleHQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0VmFsdWUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuc2V0VmFsdWUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0Q2hlY2tlZCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5zZXRDaGVja2VkIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmNyZWF0ZUNvbW1lbnQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY3JlYXRlVGVtcGxhdGUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY3JlYXRlRWxlbWVudCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5jcmVhdGVFbGVtZW50TlMiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY3JlYXRlVGV4dE5vZGUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY3JlYXRlU2NyaXB0VGFnIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmNyZWF0ZVN0eWxlRWxlbWVudCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5jcmVhdGVTaGFkb3dSb290IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldFNoYWRvd1Jvb3QiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0SG9zdCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5jbG9uZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmNsYXNzTGlzdCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5hZGRDbGFzcyIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5yZW1vdmVDbGFzcyIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5oYXNDbGFzcyIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5zZXRTdHlsZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5yZW1vdmVTdHlsZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5nZXRTdHlsZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci50YWdOYW1lIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmF0dHJpYnV0ZU1hcCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5oYXNBdHRyaWJ1dGUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0QXR0cmlidXRlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnNldEF0dHJpYnV0ZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5zZXRBdHRyaWJ1dGVOUyIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5yZW1vdmVBdHRyaWJ1dGUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIudGVtcGxhdGVBd2FyZVJvb3QiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY3JlYXRlSHRtbERvY3VtZW50IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmRlZmF1bHREb2MiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldFRpdGxlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLnNldFRpdGxlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmVsZW1lbnRNYXRjaGVzIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmlzVGVtcGxhdGVFbGVtZW50IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmlzVGV4dE5vZGUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuaXNDb21tZW50Tm9kZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5pc0VsZW1lbnROb2RlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmhhc1NoYWRvd1Jvb3QiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuaXNTaGFkb3dSb290IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmltcG9ydEludG9Eb2MiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuYWRvcHROb2RlIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldEhyZWYiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0RXZlbnRLZXkiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0R2xvYmFsRXZlbnRUYXJnZXQiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0SGlzdG9yeSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5nZXRMb2NhdGlvbiIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5nZXRCYXNlSHJlZiIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5yZXNldEJhc2VFbGVtZW50IiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldFVzZXJBZ2VudCIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5zZXREYXRhIiwibXouZG9tLkJyb3dzZXJEb21BZGFwdGVyLmdldERhdGEiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuZ2V0Q29tcHV0ZWRTdHlsZSIsIm16LmRvbS5Ccm93c2VyRG9tQWRhcHRlci5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIuY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtei5kb20uQnJvd3NlckRvbUFkYXB0ZXIucGVyZm9ybWFuY2VOb3ciLCJtei5kb20uZ2V0QmFzZUVsZW1lbnRIcmVmIiwibXouZG9tLnJlbGF0aXZlUGF0aCIsIm16LmRvbS5taWNyb3F1ZXVlIiwibXouZG9tLm1pY3JvcXVldWUubWFrZVJlcXVlc3RGbHVzaEZyb21NdXRhdGlvbk9ic2VydmVyIiwibXouZG9tLm1pY3JvcXVldWUubWFrZVJlcXVlc3RGbHVzaEZyb21NdXRhdGlvbk9ic2VydmVyLnJlcXVlc3RGbHVzaCIsIm16LmRvbS5taWNyb3F1ZXVlLm1ha2VSZXF1ZXN0Rmx1c2hGcm9tVGltZXIiLCJtei5kb20ubWljcm9xdWV1ZS5tYWtlUmVxdWVzdEZsdXNoRnJvbVRpbWVyLnJlcXVlc3RGbHVzaCIsIm16LmRvbS5taWNyb3F1ZXVlLm1ha2VSZXF1ZXN0Rmx1c2hGcm9tVGltZXIucmVxdWVzdEZsdXNoLmhhbmRsZUZsdXNoVGltZXIiLCJtei5kb20ubWljcm9xdWV1ZS5vbkVycm9yIiwibXouZG9tLm1pY3JvcXVldWUuTWljcm9UYXNrUXVldWUiLCJtei5kb20ubWljcm9xdWV1ZS5NaWNyb1Rhc2tRdWV1ZS5jb25zdHJ1Y3RvciIsIm16LmRvbS5taWNyb3F1ZXVlLk1pY3JvVGFza1F1ZXVlLnF1ZXVlTWljcm9UYXNrIiwibXouZG9tLm1pY3JvcXVldWUuTWljcm9UYXNrUXVldWUuZmx1c2hNaWNyb1Rhc2tRdWV1ZSIsIm16LmRvbS5taWNyb3F1ZXVlLk1pY3JvUXVldWVPcEtpbmQiLCJtei5kb20ubWljcm9xdWV1ZS5mbHVzaCIsIm16LmRvbS5taWNyb3F1ZXVlLmFwcGVuZENoaWxkIiwibXouZG9tLm1pY3JvcXVldWUuY2FsbGJhY2siLCJtei5kb20ubWljcm9xdWV1ZS5yZW1vdmUiLCJtei5kb20ubWljcm9xdWV1ZS5zZXRUZXh0IiwibXouZG9tLm1pY3JvcXVldWUuc2V0QXR0cmlidXRlIiwibXouQXR0cmlidXRlRGlyZWN0aXZlIiwibXouQXR0cmlidXRlRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwibXouQXR0cmlidXRlRGlyZWN0aXZlLm1vdW50IiwibXouQXR0cmlidXRlRGlyZWN0aXZlLnVubW91bnQiLCJtei5BdHRyaWJ1dGVEaXJlY3RpdmUuY2hhbmdlZCIsIm16LkF0dHJpYnV0ZURpcmVjdGl2ZS52YWx1ZSIsIm16LkF0dHJpYnV0ZURpcmVjdGl2ZS5SZWdpc3RlciIsIm16LnNldFNjb3BlUmVjdXJzaXZlQW5kRW5hYmxlTGlzdGVuZXJzIiwibXoucXVhc2lUb0RvbSIsIm16LmJpbmRXaWRnZXRBdHRyIiwibXouZG9tVG9XaWRnZXRzIiwibXouZ2V0Q2hpbGROb2RlcyIsIm16LmdldEpRdWVyeUV2ZW50V3JhcHBlciIsIm16LmVycm9yTG9hZGluZ1RlbXBsYXRlIiwibXouV2lkZ2V0IiwibXouV2lkZ2V0LmNvbnN0cnVjdG9yIiwibXouV2lkZ2V0LnNjb3BlX2NoYW5nZWQiLCJtei5XaWRnZXQuRE9NIiwibXouV2lkZ2V0LmdlbmVyYXRlU2NvcGVkQ29udGVudCIsIm16LldpZGdldC5yZWxlYXNlU2NvcGVkQ29udGVudCIsIm16LldpZGdldC5hdHRyIiwibXouV2lkZ2V0LnJlZnJlc2hTY29wZSIsIm16LldpZGdldC5maW5kIiwibXouV2lkZ2V0LmxvYWRUZW1wbGF0ZSIsIm16LldpZGdldC5jb21wb25lbnRJbml0aWFsaXplZCIsIm16LldpZGdldC5zdGFydENvbXBvbmVudCIsIm16LldpZGdldC5hcHBlbmRDaGlsZHJlbnMiLCJtei5XaWRnZXQuZmluZENvbnRlbnRTZWxlY3RvciIsIm16LldpZGdldC5hcHBlbmQiLCJtei5XaWRnZXQuYXBwZW5kVG8iLCJtei5XaWRnZXQuaW5pdEF0dHIiLCJtei5XaWRnZXQucmVzaXplIiwibXouV2lkZ2V0LnVubW91bnQiLCJtei5XaWRnZXQuUmVnaXN0ZXJDb21wb25lbnQiLCJtei5XaWRnZXQuQ29uZmlndXJlRW1wdHlUYWciLCJtei5XaWRnZXQuVGVtcGxhdGUiLCJtei5XaWRnZXQuQ29uZmlndXJlVW53cmFwcGVkIiwibXouV2lkZ2V0LkNvbmZpZ3VyZVRhZyIsIm16LldpZGdldC5BdHRyaWJ1dGUiLCJtei53aWRnZXRzLkJhc2VFbGVtZW50IiwibXoud2lkZ2V0cy5CYXNlRWxlbWVudC5jb25zdHJ1Y3RvciIsIm16LndpZGdldHMuQmFzZVBhZ2VsZXQiLCJtei53aWRnZXRzLkJhc2VQYWdlbGV0LmNvbnN0cnVjdG9yIiwibXoud2lkZ2V0cy5JbmxpbmVQYWdlbGV0IiwibXoud2lkZ2V0cy5JbmxpbmVQYWdlbGV0LmNvbnN0cnVjdG9yIiwibXoud2lkZ2V0cy5NelN3aXRjaGVyIiwibXoud2lkZ2V0cy5NelN3aXRjaGVyLmNvbnN0cnVjdG9yIiwibXoud2lkZ2V0cy5NelN3aXRjaGVyLnNob3ciLCJtei53aWRnZXRzLk16U3dpdGNoZXIucmVzaXplIiwibXoud2lkZ2V0cy5NelN3aXRjaGVyUGFuZWwiLCJtei53aWRnZXRzLk16U3dpdGNoZXJQYW5lbC5jb25zdHJ1Y3RvciIsIm16LndpZGdldHMuTXpTd2l0Y2hlclBhbmVsLnNob3ciLCJtei53aWRnZXRzLk16U3dpdGNoZXJQYW5lbC5pc1Zpc2libGUiLCJtei5hcHAiLCJtei5hcHAuUm91dGVOYW1lIiwibXouYXBwLlBhZ2UiLCJtei5hcHAuUGFnZS5jb25zdHJ1Y3RvciIsIm16LmFwcC5QYWdlLndpbmRvd1RpdGxlX2NoYW5nZWQiLCJtei5hcHAuUGFnZS5oYW5kbGVSb3V0ZSIsIm16LmFwcC5QYWdlLnNob3ciLCJtei5hcHAuUGFnZUNvb3JkaW5hdG9yIiwibXouYXBwLlBhZ2VDb29yZGluYXRvci5jb25zdHJ1Y3RvciIsIm16LmFwcC5QYWdlQ29vcmRpbmF0b3Iuc2V0UGFnZXMiLCJtei5hcHAuUGFnZUNvb3JkaW5hdG9yLmxvYWRlZCIsIm16LmFwcC5QYWdlQ29vcmRpbmF0b3IudXBkYXRlUGFnZVRpdGxlIiwibXouYXBwLlBhZ2VDb29yZGluYXRvci5hY3R1YWxQYWdlX2NoYW5nZWQiLCJtei5hcHAuUGFnZUNvb3JkaW5hdG9yLnNob3ciLCJtei5hcHAuUGFnZUNvb3JkaW5hdG9yLm5hdmlnYXRlIiwibXouYXBwLlBhZ2VDb29yZGluYXRvci5nZXRQYWdlIiwibXoucmVkdXgiLCJtei5yZWR1eC5zdGF0ZUhlbHBlcnMiLCJtei5yZWR1eC5zdGF0ZUhlbHBlcnMuY2xvbmVBcnJheSIsIm16LnJlZHV4LnN0YXRlSGVscGVycy5jbG9uZUFycmF5QW5kUHVzaCIsIm16LnJlZHV4LnN0YXRlSGVscGVycy5jbG9uZURlZXAiLCJtei5yZWR1eC5zdGF0ZUhlbHBlcnMuY2xvbmVTaGFsbG93IiwibXoucmVkdXguQWN0aW9uVHlwZXMiLCJtei5yZWR1eC5jb25uZWN0V2lkZ2V0IiwibXoucmVkdXgud3JhcEFjdGlvbkNyZWF0b3JzIiwibXoucmVkdXguc2hhbGxvd0VxdWFsIiwibXoucmVkdXguYmluZEFjdGlvbkNyZWF0b3IiLCJtei5yZWR1eC5iaW5kQWN0aW9uQ3JlYXRvcnMiLCJtei5yZWR1eC5hcHBseU1pZGRsZXdhcmUiLCJtei5yZWR1eC5jb21wb3NlIiwibXoucmVkdXguY3JlYXRlU3RvcmUiLCJtei5yZWR1eC5jcmVhdGVTdG9yZS5lbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzIiwibXoucmVkdXguY3JlYXRlU3RvcmUuZ2V0U3RhdGUiLCJtei5yZWR1eC5jcmVhdGVTdG9yZS5zdWJzY3JpYmUiLCJtei5yZWR1eC5jcmVhdGVTdG9yZS5zdWJzY3JpYmUudW5zdWJzY3JpYmUiLCJtei5yZWR1eC5jcmVhdGVTdG9yZS5kaXNwYXRjaCIsIm16LnJlZHV4LmNyZWF0ZVN0b3JlLnJlcGxhY2VSZWR1Y2VyIiwibXoucmVkdXguZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UiLCJtei5yZWR1eC5nZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlIiwibXoucmVkdXguYXNzZXJ0UmVkdWNlclNhbml0eSIsIm16LnJlZHV4LmNvbWJpbmVSZWR1Y2VycyIsIm16LnJlZHV4LmNvbWJpbmVSZWR1Y2Vycy5jb21iaW5hdGlvbiIsIm16LnJlZHV4Lm1ha2VGaWx0ZXIiLCJtei5yZWR1eC5jcmVhdGVNYW5hZ2VyIiwibXouYXV0aCIsIm16LmF1dGguand0IiwibXouYXV0aC5qd3QudXJsQmFzZTY0RGVjb2RlIiwibXouYXV0aC5qd3QuZGVjb2RlVG9rZW4iLCJtei5hdXRoLmp3dC5nZXRUb2tlbkV4cGlyYXRpb25EYXRlIiwibXouYXV0aC5qd3QuaXNUb2tlbkV4cGlyZWQiLCJtei5kYXRlIiwibXouZGF0ZS5wYXJzZU9iamVjdCIsIm16LmRhdGUuYWRkRmVhdHVyZSIsIm16LmRhdGUuZnJvbVN0cmluZyIsIm16LmRhdGUubmV3U3luY3JvIiwibXouZGF0ZS5zeW5jIiwibXouZGF0ZS5wYXJzZSIsIm16LmRhdGUucGFyc2UucGFyc2VKc29uRGF0ZSIsIm16LmRhdGUucGFyc2UuY29udmVydGlyQUZlY2hhSG9yYSIsIm16LmRhdGUucGFyc2UuY29udmVydGlyQUZlY2hhIiwibXouZGF0ZS5hZGQiLCJtei5kYXRlLmZtdF9kYXRlIiwibXouZGF0ZS5mbXRfdGltZSIsIm16LmRhdGUuZm10X2RhdGVfdGltZSIsIm16LmRhdGUudG9TdHJpbmciLCJtei5kYXRlLmZtdF9kdXJhY2lvbiIsIm16LmRhdGUucGFyc2VEdXJhY2lvbiIsIm16LnByb21pc2UiLCJtei5wcm9taXNlLndhaXQiLCJtei5wcm9taXNlLnlpZWxkIiwibXoucHJvbWlzZS5uZXh0RnJhbWUiLCJtei5wcm9taXNlLnBhcnNlU3RyaW5nRGF0ZXMiLCJtei5yZXMiLCJtei5nZXRQYXJhbXMiLCJtei54ciIsIm16LnhyLmZvcm1hdHRlcnMiLCJtei54ci54bWxIdHRwUmVxdWVzdCIsIm16LnhyLnByb21pc2UiLCJtei54ci51cmxSZXNvbHZlIiwibXoueHIudXJsSXNTYW1lT3JpZ2luIiwibXoueHIudXJsRW5jb2RlIiwibXoueHIuZ2V0IiwibXoueHIucHV0IiwibXoueHIucG9zdCIsIm16LnhyLnBhdGNoIiwibXoueHIuZGVsIiwibXoueHIub3B0aW9ucyIsIm16Lm9hdXRoMiIsIm16Lm9hdXRoMi5leHRyYWN0RG9tYWluIiwibXoub2F1dGgyLnRva2VuR2V0dGVyIiwibXoub2F1dGgyLnNldHVwVG9rZW4iLCJtei5vYXV0aDIuc2V0VG9rZW4iLCJtei5vYXV0aDIuY2hlY2tSb2xlIiwibXoub2F1dGgyLnB1c2hSb2xlcyIsIm16Lm9hdXRoMi5hcHBseUF1dGhvcml6YXRpb25IZWFkZXJzIiwibXoub2F1dGgyLmNvbmZpZ3VyZSIsIm16Lm9hdXRoMi5yZWZyZXNoVG9rZW4iLCJtei5vYXV0aDIubG9nb3V0IiwibXoub2F1dGgyLmxvZ2luIiwibXoub2F1dGgyLmxvZ2dlZEluIiwibXoucmVxdWlyZSIsIm16LmluY2x1ZGUiLCJtei5sb2FkTW9kdWxlIiwibXoucmVxdWlyZS5yb3V0ZSIsIm16LnJlcXVpcmUuZGVmaW5lRmlsZXMiLCJtei5Nb2R1bGUiLCJtei5Nb2R1bGUuY29uc3RydWN0b3IiLCJtei5Nb2R1bGUuZ2V0UGF0aCIsIm16Lk1vZHVsZS5yZXF1aXJlIiwibXouTW9kdWxlLmRlZmluZSIsIm16Lk1vZHVsZUV4cG9ydHMiLCJtei5Nb2R1bGVFeHBvcnRzLmNvbnN0cnVjdG9yIiwibXouTW9kdWxlRXhwb3J0cy5zZXQiLCJtei51bmRlZmluZSIsIm16LmRlZmluZSIsIm16LkNvbGxlY3Rpb24iLCJtei5Db2xsZWN0aW9uLmNvbnN0cnVjdG9yIiwibXouQ29sbGVjdGlvbi5maXJzdCIsIm16LkNvbGxlY3Rpb24ubGFzdCIsIm16LkNvbGxlY3Rpb24uY2xlYXIiLCJtei5Db2xsZWN0aW9uLmxlbmd0aCIsIm16LkNvbGxlY3Rpb24uZ2V0TGVuZ3RoIiwibXouQ29sbGVjdGlvbi5zZXRMZW5ndGgiLCJtei5Db2xsZWN0aW9uLm1hcCIsIm16LkNvbGxlY3Rpb24uZm9yRWFjaCIsIm16LkNvbGxlY3Rpb24uYXN5bmNGb3JFYWNoIiwibXouQ29sbGVjdGlvbi5hc3luY0ZvckVhY2guc2NoIiwibXouQ29sbGVjdGlvbi5faW5kaXphciIsIm16LkNvbGxlY3Rpb24uX2RlaW5kaXphciIsIm16LkNvbGxlY3Rpb24uX3JlaW5kaXphciIsIm16LkNvbGxlY3Rpb24uZ2V0QXQiLCJtei5Db2xsZWN0aW9uLnJlZHVjZSIsIm16LkNvbGxlY3Rpb24uZ3JvdXBCeSIsIm16LkNvbGxlY3Rpb24ua2V5IiwibXouQ29sbGVjdGlvbi5pbnNlcnRBdCIsIm16LkNvbGxlY3Rpb24ucmVtb3ZlQXQiLCJtei5Db2xsZWN0aW9uLnNldEF0IiwibXouQ29sbGVjdGlvbi5wdXNoIiwibXouQ29sbGVjdGlvbi5wb3AiLCJtei5Db2xsZWN0aW9uLmFkZFJhbmdlIiwibXouQ29sbGVjdGlvbi51cGRhdGUiLCJtei5Db2xsZWN0aW9uLnVwZGF0ZUJ5S2V5IiwibXouQ29sbGVjdGlvbi51cGRhdGVJbmRleCIsIm16LkNvbGxlY3Rpb24uam9pbiIsIm16LkNvbGxlY3Rpb24uc3VtIiwibXouQ29sbGVjdGlvbi5vcmRlckJ5IiwibXouQ29sbGVjdGlvbi5vcmRlckJ5RGVzYyIsIm16LkNvbGxlY3Rpb24uc29tZSIsIm16LkNvbGxlY3Rpb24ud2hlcmUiLCJtei5Db2xsZWN0aW9uLnJlbW92ZUJ5S2V5IiwibXouQ29sbGVjdGlvbi5yZW1vdmUiLCJtei5Db2xsZWN0aW9uLnNpbmdsZSIsIm16LkNvbGxlY3Rpb24uY29udGFpbnMiLCJtei5Db2xsZWN0aW9uLmNvbnRhaW5zS2V5IiwibXouQ29sbGVjdGlvbi5pbmRleE9mIiwibXouQ29sbGVjdGlvbi5sYXN0SW5kZXhPZiIsIm16LkNvbGxlY3Rpb24udG9BcnJheSIsIm16LkNvbGxlY3Rpb24uY2xvbmUiLCJtei5Db2xsZWN0aW9uLmluZGV4ZWRHZXQiLCJtei5Db2xsZWN0aW9uLmluZGV4ZWRHZXRJbmRleCIsIm16LkNvbGxlY3Rpb24ubWVyZ2VFbGVtIiwibXouQ29sbGVjdGlvbi5tYXgiLCJtei5Db2xsZWN0aW9uLm1pbiIsIm16LkNvbGxlY3Rpb24uYXZnIiwibXouQ29sbGVjdGlvbi50YWtlIiwibXouQ29sbGVjdGlvbi50YWtlSW50byIsIm16LkNvbGxlY3Rpb24uc3dhcEl0ZW1zIiwibXouQ29sbGVjdGlvbi5jb3VudCIsIm16LkNvbGxlY3Rpb24ucmV2ZXJzZSIsIm16LkNvbGxlY3Rpb24ubWVyZ2VBcnJheSIsIm16LkNvbGxlY3Rpb24uY3JlYXRlVmlldyIsIm16LkNvbGxlY3Rpb24uZ2V0UHJpdmF0ZUFycmF5IiwibXouQ29sbGVjdGlvblZpZXciLCJtei5Db2xsZWN0aW9uVmlldy5jb25zdHJ1Y3RvciIsIm16LkNvbGxlY3Rpb25WaWV3LmZpbHRlcl9jaGFuZ2VkIiwibXouQ29sbGVjdGlvblZpZXcuX2hhbmRsZUNoYW5nZWQiLCJtei5Db2xsZWN0aW9uVmlldy5fcmVtYWtlIiwibXouQ29sbGVjdGlvblZpZXcucmVzb3J0IiwibXouQ29sbGVjdGlvblZpZXcucmVmcmVzaCIsIm16LkNvbGxlY3Rpb25WaWV3LmZpbHRlciIsIm16LkNvbGxlY3Rpb25WaWV3Lm9yZGVyQnkiLCJtei5Db2xsZWN0aW9uVmlldy5vcmRlckJ5RGVzYyIsIm16LkNvbGxlY3Rpb25WaWV3LmF0dGFjaFRvIiwibXouQ29sbGVjdGlvblZpZXcuZGV0YWNoIiwiUmVmbGVjdCIsIlJlZmxlY3QubWV0YWRhdGEiLCJSZWZsZWN0Lm1ldGFkYXRhLmRlY29yYXRvciIsIlJlZmxlY3Quc2V0T2JqZWN0U3ltYm9sIiwiZ2V0UHJvcGVydHlEZXNjcmlwdG9yIiwiUmVmbGVjdC5nZXRQcm90b3R5cGVPZiIsIm16LmNzcyIsIm16LmNzcy5zZXQiLCJtei5jc3MuU3R5bGVzaGVldCIsIm16LmNzcy5TdHlsZXNoZWV0LmNvbnN0cnVjdG9yIiwibXouY3NzLlN0eWxlc2hlZXQuZW5hYmxlIiwibXouY3NzLlN0eWxlc2hlZXQuZGlzYWJsZSIsIm16LmNzcy5TdHlsZXNoZWV0LnJlZnJlc2giLCJtei5jc3MuU3R5bGVzaGVldC5zZXQiLCJ1aWtpdCIsInVpa2l0LkZpdCIsInVpa2l0LkZpdC5jb25zdHJ1Y3RvciIsInVpa2l0LkZpdC5jbGFzc19jaGFuZ2VkIiwidWlraXQuQ2xlYXIiLCJ1aWtpdC5DbGVhci5jb25zdHJ1Y3RvciIsInVpa2l0LkZsZXhDb2wiLCJ1aWtpdC5GbGV4Q29sLmNvbnN0cnVjdG9yIiwidWlraXQuRmxleENvbC5zdHlsZV9jaGFuZ2VkIiwidWlraXQuRmxleENvbC5jbGFzc19jaGFuZ2VkIiwidWlraXQuRmxleENvbFsnY29sLXdpZHRoX2NoYW5nZWQnXSIsInVpa2l0LkZsZXhDb250YWluZXIiLCJ1aWtpdC5GbGV4Q29udGFpbmVyLmNvbnN0cnVjdG9yIiwidWlraXQuRmxleENvbnRhaW5lci5jbGFzc19jaGFuZ2VkIiwidWlraXQuRmxleFJvdyIsInVpa2l0LkZsZXhSb3cuY29uc3RydWN0b3IiLCJ1aWtpdC5GbGV4Um93LmNsYXNzX2NoYW5nZWQiLCJ1aWtpdC5GbGV4Q2VsbCIsInVpa2l0LkZsZXhDZWxsLmNvbnN0cnVjdG9yIiwidWlraXQuRmxleENlbGwuY2xhc3NfY2hhbmdlZCIsIk16TW9kZWxEaXJlY3RpdmUiLCJNek1vZGVsRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTXpNb2RlbERpcmVjdGl2ZS5nZXRTZWxlY3RlZE9wdGlvblNjb3BlIiwiTXpNb2RlbERpcmVjdGl2ZS5nZXRPcHRpb25XaXRoU2NvcGUiLCJNek1vZGVsRGlyZWN0aXZlLnVubW91bnQiLCJNek1vZGVsRGlyZWN0aXZlLnRlYXJkb3duIiwiTXpNb2RlbERpcmVjdGl2ZS5jaGFuZ2VkIiwibXoud2lkZ2V0cy5NeklucHV0IiwibXoud2lkZ2V0cy5NeklucHV0LmNvbnN0cnVjdG9yIiwibXoud2lkZ2V0cy5NeklucHV0LmZvY3VzIiwibXoud2lkZ2V0cy5NeklucHV0LmlzVmFsaWQiLCJNelJhd0RpcmVjdGl2ZSIsIk16UmF3RGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTXpSYXdEaXJlY3RpdmUuY2hhbmdlZCIsIk16Q2xhc3NOYW1lRGlyZWN0aXZlIiwiTXpDbGFzc05hbWVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJNekNsYXNzTmFtZURpcmVjdGl2ZS5jaGFuZ2VkIiwiTXpWaXNpYmxlRGlyZWN0aXZlIiwiTXpWaXNpYmxlRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTXpWaXNpYmxlRGlyZWN0aXZlLm1vdW50IiwiTXpWaXNpYmxlRGlyZWN0aXZlLnVubW91bnQiLCJNelZpc2libGVEaXJlY3RpdmUuY2hhbmdlZCIsIm16LnZpZXcuaHRtbCIsIm16LnZpZXcuaHRtbC5lc2NhcGUiLCJtei52ZG9tIiwibXoudmRvbS5jcmVhdGVFbGVtZW50IiwibXouaCIsIm16LndpZGdldHMudHJhbnNmb3JtQ3NzTG9jYWwiLCJtei53aWRnZXRzLlN0eWxlQ29tcG9uZW50IiwibXoud2lkZ2V0cy5TdHlsZUNvbXBvbmVudC5jb25zdHJ1Y3RvciIsIm16LndpZGdldHMuU3R5bGVDb21wb25lbnQudGV4dFZhbHVlX2NoYW5nZWQiLCJtei53aWRnZXRzLlN0eWxlQ29tcG9uZW50LnVwZGF0ZSIsIm16LndpZGdldHMuTXpGb3JtIiwibXoud2lkZ2V0cy5NekZvcm0uY29uc3RydWN0b3IiLCJtei53aWRnZXRzLk16Rm9ybS52YWx1ZV9jaGFuZ2VkIiwibXoud2lkZ2V0cy5NekZvcm0uYWRvcHRJbnB1dCIsIm16LndpZGdldHMuTXpGb3JtLl9maW5kSUNhbXBvcyIsIm16LndpZGdldHMuTXpGb3JtLmZpZWxkSXNWaXNpYmxlIiwibXoud2lkZ2V0cy5NekZvcm0uZm9jdXMiLCJtei53aWRnZXRzLk16Rm9ybS5pc1ZhbGlkIiwibXoud2lkZ2V0cy5NekZvcm0uY2hlY2tBbGwiLCJtei53aWRnZXRzLk16Rm9ybS5nZXREZWZhdWx0VmFsdWUiLCJtei53aWRnZXRzLk16Rm9ybS5yZXNldEZvcm0iLCJtei53aWRnZXRzLmRlbGVnYXRlVW5tb3VudEVsZW1lbnQiLCJtei53aWRnZXRzLk16UmVwZWF0IiwibXoud2lkZ2V0cy5NelJlcGVhdC5jb25zdHJ1Y3RvciIsIm16LndpZGdldHMuTXpSZXBlYXQubGlzdF9jaGFuZ2VkIiwibXoud2lkZ2V0cy5NelJlcGVhdC51bm1vdW50IiwibXoud2lkZ2V0cy5NelJlcGVhdC5wb25lckVsZW0iLCJtei53aWRnZXRzLk16UmVwZWF0LmdlbmVyYXRlU2NvcGVkQ29udGVudCIsIm16LndpZGdldHMuTXpSZXBlYXQuZGV0YWNoQWxsTm9kZXMiLCJtei53aWRnZXRzLk16UmVwZWF0LmRlbGVnYXRlVW5tb3VudEVsZW1lbnRzIiwibXoud2lkZ2V0cy5NelJlcGVhdC5yZWRyYXciXSwibWFwcGluZ3MiOiJBQUFBLHdDQUF3QztBQUN4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QUFDQSxPQUFPQSxNQUFNQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcENBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLFFBQVFBLElBQUlBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUNoQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDN0NBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO3dCQUN6Q0EsQ0FBQ0E7b0JBQ0xBLENBQUNBO2dCQUNMQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsTUFBTUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25DQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFnQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQzNDQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxNQUFNQSxLQUFLQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUM5QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2pDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDeENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO3dCQUN0Q0EsQ0FBQ0E7b0JBQ0xBLENBQUNBO2dCQUNMQSxDQUFDQTtZQUNMQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVESiw4QkFBOEJBO1FBQ3BCQSxnREFBc0JBLEdBQWhDQTtZQUNJSyxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLElBQUlBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNkQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLHNCQUFzQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3JIQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDcENBLENBQUNBO2dCQUNMQSxDQUFDQTtnQkFDREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDaENBLENBQUNBO1FBQ0xBLENBQUNBO1FBR0RMLDhCQUFJQSxHQUFKQSxVQUFLQSxLQUFhQTtZQUNkTSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFM0JBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUN4QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7d0JBQ3JEQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbENBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUNyQ0EsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDL0JBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO3dCQUNyREEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2xDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakRBLENBQUNBO2dCQUNMQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQy9CQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTt3QkFDckRBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNsQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQy9EQSxDQUFDQTtnQkFDTEEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUMvQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7d0JBQ3JEQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbENBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUM3RUEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDL0JBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO3dCQUNyREEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2xDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDM0ZBLENB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RUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFCQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFWEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1JBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO2dDQUN0REEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsUUFBUUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZFQSxDQUFDQTt3QkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7NEJBQ0pBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO2dDQUNyREEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7d0JBQ2hFQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsU0FBU0EsSUFBSUEsT0FBT0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzlIQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDcENBLENBQUNBO29CQUNMQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsV0FBV0EsS0FBS0EsVUFBVUEsSUFBSUEsS0FBS0EsS0FBS0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3RGQSxJQUFJQSxNQUFNQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFFeENBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUN4QkEsU0FBU0EsSUFBSUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3pDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDaERBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTs0QkFDSkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxNQUFNQSxFQUFFQSxxQkFBcUJBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3dCQUM1REEsQ0FBQ0E7b0JBQ0xBLENBQUNBO29CQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDSkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsS0FBS0EsUUFBUUEsSUFBSUEsV0FBV0EsS0FBS0EsUUFBUUEsSUFBSUEsV0FBV0EsS0FBS0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Es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R0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsWUFBWUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7NEJBQ3REQSxJQUFJQSxNQUFNQSxHQUFHQSxZQUFZQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFFeENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFdBQVdBLElBQUlBLE1BQU1BLENBQUNBLElBQUlBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO2dDQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsSUFBSUEsT0FBT0EsQ0FBQ0E7b0NBQ3JDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQ0FDekRBLElBQUlBO29DQUNBQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDOUVBLENBQUNBO3dCQUNMQSxDQUFDQTt3QkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsSUFBSUEsWUFBWUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQzdDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTt3QkFDekZBLENBQUNBO29CQUNMQSxDQUFDQTtnQkFDTEEsQ0FBQ0E7WUFDTEEs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QUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVMsU0FBUztJQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsS0FBSyxJQUFJO1lBQ0wsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSTtZQUNMLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSTtZQUNMLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUk7WUFDTCxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJO1lBQ0wsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxLQUFLLElBQUk7WUFDTCxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssTUFBTTtZQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUlELElBQVUsRUFBRSxDQXN4Qlg7QUF0eEJELFdBQVUsRUFBRTtJQUFDQSxRQUFJQSxDQXN4QmhCQTtJQXR4QllBLGlCQUFJQSxFQUFDQSxDQUFDQTtRQUVmcVQsSUFBSUEsYUFBYUEsR0FBR0EseUNBQXlDQSxDQUFDQTtRQUU5REEscUJBQStCQSxJQUFPQTtZQUdsQ0MsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxJQUFJQSxHQUFRQSxDQUFDQTtnQkFFYkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsWUFBWUEsS0FBS0EsQ0FBQ0E7b0JBQ3RCQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDYkEsSUFBSUE7b0JBQ0FBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUViQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakJBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO3dCQUM3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ25FQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDNUJBLENBQUNBO3dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDL0ZBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUMxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBUUEsQ0FBQ0EsQ0FBQ0E7Z0NBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDZkEsSUFBSUE7Z0NBQ0FBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUN6QkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNKQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFD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TUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2JBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUVoQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsK0JBQStCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDM0NBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLDJCQUEyQkEsQ0FBQ0EsSUFBSUEsTUFBTUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hIQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDNUJBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO29CQUM1QkEsSUFBSUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBRTlCQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDWEEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7d0JBQ1pBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO3dCQUNWQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDWkEsQ0FBQ0E7b0JBRURBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNB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O1lBQ2RBLENBQUNBO1lBRURBLElBQUlBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBQzdCQSxJQUFJQSxHQUFHQSxHQUFHQSxRQUFRQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUNoQ0EsSUFBSUEsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7WUFFaENBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNUQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUUvQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ1JBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBRTdCQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDVEEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7WUFFL0JBLFFBQVFBLEdBQUdBLFFBQVFBLElBQUlBLEtBQUtBLENBQUNBO1lBRTdCQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxDQUFDQSxRQUFRQSxJQUFJQSxLQUFLQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxRQUFRQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNsR0EsQ0FBQ0E7UUExQmVaLGVBQVFBLFdBMEJ2QkE7UUFFREEsdUJBQThCQSxRQUFRQSxFQUFFQSxRQUFRQTtZQUM1Q2EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsS0FBS0EsSUFBSUEsQ0FBQ0E7Z0JBQUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxRQUFRQSxHQUFHQSxRQUFR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LENBQUNBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUNsQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsRUFBRUEsTUFBTUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDNURBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLEVBQUVBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3ZGQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNsQkEsQ0FBQ0E7UUFDRHBCOzs7OztVQUtEQTtRQUNDQSwwQkFBS0EsR0FBTEEsVUFBTUEsTUFBY0EsRUFBRUEsUUFBV0E7WUFDN0JxQixJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBO1lBQzlCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsRUFBRUEsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDdEVBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLEVBQUVBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3JHQSxDQUFDQTtRQUdEckI7Ozs7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Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFFdENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBO2dCQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQzVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUVwQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDakJBLENBQUNBO1FBRURoQzs7Ozs7O1dBTUFBO1FBRUFBLDBCQUFLQSxHQUFMQSxVQUFNQSxlQUFvREEsRUFBRUEsVUFBZ0JBO1lBQ3hFaUMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsZUFBZUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxVQUFVQSxFQUFLQSxDQUFDQTtnQkFFOUJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBO29CQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BFQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxD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Q0EsQ0FBQ0EsQ0FBQ0E7NEJBQ2xDQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDcERBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLENBQUNBLEtBQWVBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTt3QkFDaEVBLENBQUNBO29CQUNMQSxDQUFDQTtnQkFDTEEsQ0FBQ0E7Z0JBRURBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBO29CQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBZUEsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBR0pBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBO29CQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBS0EsS0FBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FB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QUFoQkEsUUFBZ0JBO1lBQ3pFQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUN0RUEsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFdkJBLElBQUlBLE9BQU9BLEdBQUdBLENBQUNBLENBQUNBO1lBRWhCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQTtnQkFDN0JBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWhDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRGxELDhCQUFTQSxHQUFUQSxVQUFVQSxPQUFlQSxFQUFFQSxPQUFlQTtZQUN0Q21ELElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2hDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUMxQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO1lBQ2xCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxFQUFFQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1lBQ3pFQSxJQUFJQSxDQUFD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QzNCQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtvQkFDdEJBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO2dCQUNuQkEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLGFBQVVBLENBQUNBLE1BQU1BLENBQUNBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3pEQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSx1QkFBdUJBLENBQUNBLENBQUNBO29CQUNoREEsTUFBTUEsQ0FBQ0E7Z0JBQ1hBLENBQUNBO2dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxhQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLElBQUlBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO29CQUM1REEsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0JBQzFCQSxDQUFDQTtnQkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzlCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtnQkFDdENBLENBQUNBO1lBQ0xBLENBQUNBO1lBMUpEUjtnQkFBQ0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0E7O2VBQ25CQSwwQkFBSUEsVUFBb0JBO1lBRXhCQTtnQkFBQ0EsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0E7O2VBQ25CQSw4QkFBUUEsVUFBZ0RBO1lBUjVEQTtnQkFBQ0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxDQUFDQTtnQkFDeENBLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkE7O3lCQThKM0JBO1lBQURBLGVBQUNBO1FBQURBLENBQUNBLEVBN0o2QjljLEVBQUVBLENBQUNBLE1BQU1BLEVBNkp0Q0E7UUE3SllBLGtCQUFRQSxXQTZKcEJBO0lBQ0xBLENBQUNBLEVBMUtTM0QsT0FBT0EsR0FBUEEsVUFBT0EsS0FBUEEsVUFBT0EsUUEwS2hCQTtBQUFEQSxDQUFDQSxFQTFLTSxFQUFFLEtBQUYsRUFBRSxRQTBLUiIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbXX0=
