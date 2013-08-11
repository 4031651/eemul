/*global jQuery*/

/**
 * Event emulation JavaScript library.
 * Licensed under the MIT license
 * 
 * @author   Sergey Tsapenko <4031651@gmail.com>
 * @version  0.1.1
 */

// Global namespase
var eemul = {};

/**
 * Find center coords of DOMElement.
 * @private
 * 
 * @param {Mixed} elem
 * @return {Object}  Object that describe center position of given element
 */
eemul.findCenter = function (elem) {
    var el = jQuery(elem),
        o  = el.offset(),
        d  = jQuery(document);
    return {
        left: o.left + el.outerWidth() / 2 - d.scrollLeft(),
        top: o.top + el.outerHeight() / 2 - d.scrollTop()
    };
};

/**
 * Emulate click event.
 * 
 * @param {Mixed}  selector A selector, element or jQuery object for which will be trigger the event
 * @param {Object} coords   Hash that contains the top(y) and left(x) coordinates of the click. If not specified will be calculated automaticaly
 */
eemul.click = function (selector, coords) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }
    var evt = document.createEvent("MouseEvents"),
        coords = coords || eemul.findCenter(elem);

    evt.initMouseEvent("click", true, true, window, 1, coords.left, coords.top, coords.left, coords.top, false, false, false, false, 0, null);
    elem.dispatchEvent(evt);
};

/**
 * Emulate dragging to specified point.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 * @param {Number} dX      Increment of the X coordinate
 * @param {Number} dY      Increment of the Y coordinate
 * @param {Number} time    The duration of the animation
 * @param {Number} steps   The number of the animation steps
 */
eemul.dragTo = function (selector, dX, dY, time, steps) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    steps = steps || 10;
    time = time || 1000;

    var mdown = document.createEvent("MouseEvents"),
        coords = eemul.findCenter(elem),
        x = coords.left + 0,
        y = coords.top + 0,
        incX = dX / steps,
        incY = dY / steps;

    function far(a, b, th) {
        return Math.abs(a - b) > Math.abs(th);
    }

    mdown.initMouseEvent("mousedown", true, true, window, 1, coords.left, coords.top, coords.left, coords.top, false, false, false, false, 0, null);
    elem.dispatchEvent(mdown);

    var mmove = null, mup = null, click = null,
        th = window.setInterval(function () {
        if (far(x, coords.left + dX, incX / 2) || far(y, coords.top + dY, incY / 2)) {
            mmove = document.createEvent("MouseEvents");
            x += incX;
            y += incY;
            
            mmove.initMouseEvent("mousemove", true, true, window, 1, x, y, x, y, false, false, false, false, 0, null);
            elem.dispatchEvent(mmove);
        } else {
            window.clearInterval(th);
            mmove = document.createEvent("MouseEvents");
            mup   = document.createEvent("MouseEvents");
            click = document.createEvent("MouseEvents");
            
            mmove.initMouseEvent("mousemove", true, true, window, 1, coords.left + dX, coords.top + dY, coords.left + dX, coords.top + dY, false, false, false, false, 0, null);
            elem.dispatchEvent(mmove);
            mup.initMouseEvent("mouseup", true, true, window, 1, coords.left + dX, coords.top + dY, coords.left + dX, coords.top + dY, false, false, false, false, 0, null);
            elem.dispatchEvent(mup);
            click.initMouseEvent("click", true, true, window, 1, coords.left + dX, coords.top + dY, coords.left + dX, coords.top + dY, false, false, false, false, 0, null);
            elem.dispatchEvent(click);
        }
    }, time / steps);
};

/**
 * Emulate dragging to specified element.
 * 
 * @param {Mixed} elemSelector A selector, element or jQuery object for which will be trigger the event
 * @param {Mixed} objSelector  A selector, element or jQuery object. Tagret element
 * @param {Number} time        The duration of the animation
 * @param {Number} steps       The number of the animation steps
 */
eemul.dragToObject = function (elemSelector, objSelector,  time, steps) {
    var obj = jQuery(objSelector).get(0);
    if (!obj) {
        return;
    }
    var elem = jQuery(elemSelector).get(0);
    if (!elem) {
        return;
    }

    steps = steps || 10;
    time = time || 1000;

    var eOffset = eemul.findCenter(elem),
        oOffset = eemul.findCenter(obj);

    eemul.dragTo(elemSelector, oOffset.left - eOffset.left, oOffset.top - eOffset.top, time, steps);
};

/**
 * Emulate focus event.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 */
eemul.focus = function (selector) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }
    var focusin = document.createEvent("UIEvents"),
        focus   = document.createEvent("HTMLEvents");

    focus.initEvent('focus', true, true);
    focusin.initUIEvent('focusin', true, true, window, 1);

    elem.dispatchEvent(focusin);
    elem.dispatchEvent(focus);
    elem.focus();
};

/**
 * Emulate blur event.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 */
eemul.blur = function (selector) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('blur', true, true);

    elem.dispatchEvent(evt);
    elem.blur();
};

/**
 * Emulate keydown event.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 * @param {Number} key     Keycode
 */
eemul.keydown = function (selector, key) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    key = typeof key == 'number' ? key : key.charCodeAt(0);

    var kdown  = document.createEvent("KeyboardEvent");

    kdown.initKeyboardEvent('keydown', true, true, window, false, false, false, false, key, eemul.undef);
    elem.dispatchEvent(kdown);
};

/**
 * Emulate keypress event.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 * @param {Number} key     Keycode
 */
eemul.keypress = function (selector, key) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    key = typeof key == 'number' ? key : key.charCodeAt(0);

    var kpress = document.createEvent("KeyboardEvent");

    kpress.initKeyboardEvent('keypress', true, true, window, false, false, false, false, key, eemul.undef);
    elem.dispatchEvent(kpress);
};

/**
 * Emulate keyup event.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 * @param {Number} key     Keycode
 */
eemul.keyup = function (selector, key) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    key = typeof key == 'number' ? key : key.charCodeAt(0);

    var kup    = document.createEvent("KeyboardEvent");

    kup.initKeyboardEvent('keyup', true, true, window, false, false, false, false, key, eemul.undef);
    elem.dispatchEvent(kup);
};

/**
 * Fill an text input
 * @param {Mixed}    selector A selector, element or jQuery object for which will be trigger the event
 * @param {String}   str      The text to fill 
 * @param {Number}   time     The duration of the animation
 * @param {Function} fn       Callback function. If specified, will be called after the text was typed
 */
eemul.fill = function (selector, str, time, fn) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }
    jQuery(elem).focus();
    if (typeof time == 'undefined') {
        time = 100;
    }
    time = parseInt(time, 10);
    time = isNaN(time) ? 100 : time;

    var $elem = jQuery(elem);
    $elem.focus();

    var len = str.length,
        idx = 0,
        th  = window.setInterval(function () {
            if (idx < len) {
                var kdown  = document.createEvent("KeyboardEvent"),
                    kpress = document.createEvent("KeyboardEvent"),
                    kup    = document.createEvent("KeyboardEvent");

                kdown.initKeyboardEvent('keydown', true, true, window, false, false, false, false, str.charCodeAt(idx), 0);
                elem.dispatchEvent(kdown);
                kpress.initKeyboardEvent('keypress', true, true, window, false, false, false, false, str.charCodeAt(idx), 0);
                elem.dispatchEvent(kpress);
                $elem.val($elem.val() + str.charAt(idx));
                kup.initKeyboardEvent('keyup', true, true, window, false, false, false, false, str.charCodeAt(idx), 0);
                elem.dispatchEvent(kup);
                idx++;
            } else {
                window.clearInterval(th);
                if (typeof fn == 'function') {
                    fn();
                }
            }
        }, time);
};

/**
 * Set the checkbox to the selected state.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 */
eemul.check = function (selector) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    if (!elem.checked) {
        eemul.click(selector);
    }
};

/**
 * Set the checkbox to the unselected state.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 */
eemul.uncheck = function (selector) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    if (elem.checked) {
        eemul.click(selector);
    }
};

/**
 * Set the select to the given value.
 * 
 * @param {Mixed} selector A selector, element or jQuery object for which will be trigger the event
 * @param {Mixed} val      A desired value
 */
eemul.setSelect = function (selector, val) {
    var elem = jQuery(selector).get(0);
    if (!elem) {
        return;
    }

    if (elem.value == val) {
        return;
    }
    eemul.focus(selector);
    elem.value = val;
    eemul.blur(selector);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('change', true, true);
    elem.dispatchEvent(evt);
};

/**
 * Set the radio to the given value.
 * 
 * @param {String} name The attribute "name" of the radio element
 * @param {Mixed} val   A desired value
 */
eemul.setRadio = function (name, val) {
    if (jQuery("input[name='" + name + "']:checked").val() == val) {
        return;
    }
    eemul.click("input[name='" + name + "'][value='" + val + "']");
};

eemul.keys = {
    VK_CANCEL       : 0x03,
    VK_HELP         : 0x06,
    VK_BACK_SPACE   : 0x08,
    VK_TAB          : 0x09,
    VK_CLEAR        : 0x0C,
    VK_ENTER        : 0x0D,
    VK_RETURN       : 0x0E,
    VK_SHIFT        : 0x10,
    VK_CONTROL      : 0x11,
    VK_ALT          : 0x12,
    VK_PAUSE        : 0x13,
    VK_CAPS_LOCK    : 0x14,
    VK_KANA         : 0x15,
    VK_HANGUL       : 0x15,
    VK_JUNJA        : 0x17,
    VK_FINAL        : 0x18,
    VK_HANJA        : 0x19,
    VK_KANJI        : 0x19,
    VK_ESCAPE       : 0x1B,
    VK_CONVERT      : 0x1C,
    VK_NONCONVERT   : 0x1D,
    VK_ACCEPT       : 0x1E,
    VK_MODECHANGE   : 0x1F,
    VK_PAGE_UP      : 0x21,
    VK_PAGE_DOWN    : 0x22,
    VK_END          : 0x23,
    VK_HOME         : 0x24,
    VK_LEFT         : 0x25,
    VK_UP           : 0x26,
    VK_RIGHT        : 0x27,
    VK_DOWN         : 0x28,
    VK_SELECT       : 0x29,
    VK_PRINT        : 0x2A,
    VK_EXECUTE      : 0x2B,
    VK_PRINTSCREEN  : 0x2C,
    VK_INSERT       : 0x2D,
    VK_DELETE       : 0x2E,
    VK_CONTEXT_MENU : 0x5D,
    VK_SLEEP        : 0x5F,

    VK_NUMPAD0      : 0x60,
    VK_NUMPAD1      : 0x61,
    VK_NUMPAD2      : 0x62,
    VK_NUMPAD3      : 0x63,
    VK_NUMPAD4      : 0x64,
    VK_NUMPAD5      : 0x65,
    VK_NUMPAD6      : 0x66,
    VK_NUMPAD7      : 0x67,
    VK_NUMPAD8      : 0x68,
    VK_NUMPAD9      : 0x69,
    VK_F1           : 0x70,
    VK_F2           : 0x71,
    VK_F3           : 0x72,
    VK_F4           : 0x73,
    VK_F5           : 0x74,
    VK_F6           : 0x75,
    VK_F7           : 0x76,
    VK_F8           : 0x77,
    VK_F9           : 0x78,
    VK_F10          : 0x79,
    VK_F11          : 0x7A,
    VK_F12          : 0x7B,
    VK_F13          : 0x7C,
    VK_F14          : 0x7D,
    VK_F15          : 0x7E,
    VK_F16          : 0x7F,
    VK_F17          : 0x80,
    VK_F18          : 0x81,
    VK_F19          : 0x82,
    VK_F20          : 0x83,
    VK_F21          : 0x84,
    VK_F22          : 0x85,
    VK_F23          : 0x86,
    VK_F24          : 0x87,

    VK_NUM_LOCK     : 0x90,
    VK_SCROLL_LOCK  : 0x91,

    VK_META         : 0xE0
};