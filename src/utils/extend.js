
module.exports = function (target, sources) {

    if (Array.isArray(sources)) {
        sources.forEach(function (source) {
            Object.getOwnPropertyNames( source ).forEach(function( key ) {
                Object.defineProperty( target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        });
    } else {
        Object.getOwnPropertyNames( sources ).forEach(function( key ) {
            Object.defineProperty( target, key, Object.getOwnPropertyDescriptor(sources, key));
        });
    }

    return target

};