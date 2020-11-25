import OpenRosaXPath from 'openrosa-xpath-evaluator';

// This file is separated so it can be easily overwritten (with a different evaluator that works in IE11).

/**
 * @function xpath-evaluator-binding
 * @param {Function} addExtensions - extension function
 */
export default function( addExtensions ) {
    const evaluator = OpenRosaXPath();

    /*
     * Note: it's inefficient to extend XPathJS here (for every model instance)
     * instead of just once in the prototype.
     *
     * However, this is done to prevent breaking Medic Mobile.
     * The performance impact is probably negligible, since we don't instantiate
     * models very often.
     *
     * In any case, you don't have to use it like this. It was done for
     * Enketo Validate only. In an app that doesn't override enketo-xpathjs,
     * I'd recommend using `require('extension')(require('enketo-xpathjs'))` instead
     * and leave the addExtensions parameter empty here.
     */
    if ( typeof addExtensions === 'function' ) {
        addExtensions( evaluator );
    }

    this.xml.jsEvaluate = evaluator.evaluate;
}
