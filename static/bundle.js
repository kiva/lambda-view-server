/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = valueToObjectRepresentation;
/* harmony export (immutable) */ __webpack_exports__["g"] = storeKeyNameFromField;
/* harmony export (immutable) */ __webpack_exports__["b"] = storeKeyNameFromFieldNameAndArgs;
/* harmony export (immutable) */ __webpack_exports__["d"] = resultKeyNameFromField;
/* harmony export (immutable) */ __webpack_exports__["c"] = isField;
/* harmony export (immutable) */ __webpack_exports__["e"] = isInlineFragment;
/* harmony export (immutable) */ __webpack_exports__["i"] = graphQLResultHasError;
/* harmony export (immutable) */ __webpack_exports__["f"] = isIdValue;
/* harmony export (immutable) */ __webpack_exports__["a"] = toIdValue;
/* harmony export (immutable) */ __webpack_exports__["j"] = isJsonValue;
function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) { return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables); });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\" is not supported.\n                    Use variables instead of inline arguments to overcome this limitation.");
    }
}
function storeKeyNameFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return storeKeyNameFromFieldNameAndArgs(field.name.value, argObj_1);
    }
    return field.name.value;
}
function storeKeyNameFromFieldNameAndArgs(fieldName, args) {
    if (args) {
        var stringifiedArgs = JSON.stringify(args);
        return fieldName + "(" + stringifiedArgs + ")";
    }
    return fieldName;
}
function resultKeyNameFromField(field) {
    return field.alias ?
        field.alias.value :
        field.name.value;
}
function isField(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
function isIdValue(idObject) {
    return (idObject != null &&
        typeof idObject === 'object' &&
        idObject.type === 'id');
}
function toIdValue(id, generated) {
    if (generated === void 0) { generated = false; }
    return {
        type: 'id',
        id: id,
        generated: generated,
    };
}
function isJsonValue(jsonObject) {
    return (jsonObject != null &&
        typeof jsonObject === 'object' &&
        jsonObject.type === 'json');
}
//# sourceMappingURL=storeUtils.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_storeUtils__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["h"] = getMutationDefinition;
/* harmony export (immutable) */ __webpack_exports__["i"] = checkDocument;
/* harmony export (immutable) */ __webpack_exports__["g"] = getOperationName;
/* harmony export (immutable) */ __webpack_exports__["c"] = getFragmentDefinitions;
/* harmony export (immutable) */ __webpack_exports__["b"] = getQueryDefinition;
/* harmony export (immutable) */ __webpack_exports__["f"] = getOperationDefinition;
/* unused harmony export getFragmentDefinition */
/* harmony export (immutable) */ __webpack_exports__["a"] = createFragmentMap;
/* harmony export (immutable) */ __webpack_exports__["d"] = getFragmentQueryDocument;
/* harmony export (immutable) */ __webpack_exports__["e"] = getDefaultValues;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function getMutationDefinition(doc) {
    checkDocument(doc);
    var mutationDef = null;
    doc.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition'
            && definition.operation === 'mutation') {
            mutationDef = definition;
        }
    });
    if (!mutationDef) {
        throw new Error('Must contain a mutation definition.');
    }
    return mutationDef;
}
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var foundOperation = false;
    doc.definitions.forEach(function (definition) {
        switch (definition.kind) {
            case 'FragmentDefinition':
                break;
            case 'OperationDefinition':
                if (foundOperation) {
                    throw new Error('Queries must have exactly one operation definition.');
                }
                foundOperation = true;
                break;
            default:
                throw new Error("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
    });
}
function getOperationName(doc) {
    var res = '';
    doc.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition' && definition.name) {
            res = definition.name.value;
        }
    });
    return res;
}
function getFragmentDefinitions(doc) {
    var fragmentDefinitions = doc.definitions.filter(function (definition) {
        if (definition.kind === 'FragmentDefinition') {
            return true;
        }
        else {
            return false;
        }
    });
    return fragmentDefinitions;
}
function getQueryDefinition(doc) {
    checkDocument(doc);
    var queryDef = null;
    doc.definitions.map(function (definition) {
        if (definition.kind === 'OperationDefinition'
            && definition.operation === 'query') {
            queryDef = definition;
        }
    });
    if (!queryDef) {
        throw new Error('Must contain a query definition.');
    }
    return queryDef;
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    var opDef = null;
    doc.definitions.map(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            opDef = definition;
        }
    });
    if (!opDef) {
        throw new Error('Must contain a query definition.');
    }
    return opDef;
}
function getFragmentDefinition(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    if (doc.definitions.length > 1) {
        throw new Error('Fragment must have exactly one definition.');
    }
    var fragmentDef = doc.definitions[0];
    if (fragmentDef.kind !== 'FragmentDefinition') {
        throw new Error('Must be a fragment definition.');
    }
    return fragmentDef;
}
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            throw new Error("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === 'undefined') {
        if (fragments.length !== 1) {
            throw new Error("Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        }
        actualFragmentName = fragments[0].name.value;
    }
    var query = __assign({}, document, { definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ].concat(document.definitions) });
    return query;
}
function getDefaultValues(definition) {
    if (definition.variableDefinitions && definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__data_storeUtils__["h" /* valueToObjectRepresentation */])(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return Object.assign.apply(Object, [{}].concat(defaultValues));
    }
    return {};
}
//# sourceMappingURL=getFromAST.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_anywhere__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storeUtils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isEqual__ = __webpack_require__(7);
/* unused harmony export ID_KEY */
/* harmony export (immutable) */ __webpack_exports__["a"] = readQueryFromStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = diffQueryAgainstStore;
/* unused harmony export assertIdValue */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var ID_KEY = typeof Symbol !== 'undefined' ? Symbol('id') : '@@id';
function readQueryFromStore(options) {
    var optsPatch = { returnPartialData: false };
    return diffQueryAgainstStore(__assign({}, options, optsPatch)).result;
}
var readStoreResolver = function (fieldName, idValue, args, context, _a) {
    var resultKey = _a.resultKey;
    assertIdValue(idValue);
    var objId = idValue.id;
    var obj = context.store[objId];
    var storeKeyName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["b" /* storeKeyNameFromFieldNameAndArgs */])(fieldName, args);
    var fieldValue = (obj || {})[storeKeyName];
    if (typeof fieldValue === 'undefined') {
        if (context.customResolvers && obj && (obj.__typename || objId === 'ROOT_QUERY')) {
            var typename = obj.__typename || 'Query';
            var type = context.customResolvers[typename];
            if (type) {
                var resolver = type[fieldName];
                if (resolver) {
                    return resolver(obj, args);
                }
            }
        }
        if (!context.returnPartialData) {
            throw new Error("Can't find field " + storeKeyName + " on object (" + objId + ") " + JSON.stringify(obj, null, 2) + ".");
        }
        context.hasMissingField = true;
        return fieldValue;
    }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["j" /* isJsonValue */])(fieldValue)) {
        if (idValue.previousResult && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isEqual__["a" /* isEqual */])(idValue.previousResult[resultKey], fieldValue.json)) {
            return idValue.previousResult[resultKey];
        }
        return fieldValue.json;
    }
    if (idValue.previousResult) {
        fieldValue = addPreviousResultToIdValues(fieldValue, idValue.previousResult[resultKey]);
    }
    return fieldValue;
};
function diffQueryAgainstStore(_a) {
    var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
    var queryDefinition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__queries_getFromAST__["b" /* getQueryDefinition */])(query);
    variables = Object.assign(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__queries_getFromAST__["e" /* getDefaultValues */])(queryDefinition), variables);
    var context = {
        store: store,
        returnPartialData: returnPartialData,
        customResolvers: (config && config.customResolvers) || {},
        hasMissingField: false,
    };
    var rootIdValue = {
        type: 'id',
        id: rootId,
        previousResult: previousResult,
    };
    var result = __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere___default()(readStoreResolver, query, rootIdValue, context, variables, {
        fragmentMatcher: fragmentMatcherFunction,
        resultMapper: resultMapper,
    });
    return {
        result: result,
        isMissing: context.hasMissingField,
    };
}
function assertIdValue(idValue) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(idValue)) {
        throw new Error("Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
    }
}
function addPreviousResultToIdValues(value, previousResult) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(value)) {
        return __assign({}, value, { previousResult: previousResult });
    }
    else if (Array.isArray(value)) {
        var idToPreviousResult_1 = {};
        if (Array.isArray(previousResult)) {
            previousResult.forEach(function (item) {
                if (item[ID_KEY]) {
                    idToPreviousResult_1[item[ID_KEY]] = item;
                }
            });
        }
        return value.map(function (item, i) {
            var itemPreviousResult = previousResult && previousResult[i];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(item)) {
                itemPreviousResult = idToPreviousResult_1[item.id] || itemPreviousResult;
            }
            return addPreviousResultToIdValues(item, itemPreviousResult);
        });
    }
    return value;
}
function resultMapper(resultFields, idValue) {
    if (idValue.previousResult) {
        var currentResultKeys_1 = Object.keys(resultFields);
        var sameAsPreviousResult = Object.keys(idValue.previousResult)
            .reduce(function (sameKeys, key) { return sameKeys && currentResultKeys_1.indexOf(key) > -1; }, true) &&
            currentResultKeys_1.reduce(function (same, key) { return (same && areNestedArrayItemsStrictlyEqual(resultFields[key], idValue.previousResult[key])); }, true);
        if (sameAsPreviousResult) {
            return idValue.previousResult;
        }
    }
    Object.defineProperty(resultFields, ID_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: idValue.id,
    });
    return resultFields;
}
function areNestedArrayItemsStrictlyEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return false;
    }
    return a.reduce(function (same, item, i) { return same && areNestedArrayItemsStrictlyEqual(item, b[i]); }, true);
}
//# sourceMappingURL=readFromStore.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = isQueryResultAction;
/* harmony export (immutable) */ __webpack_exports__["j"] = isQueryErrorAction;
/* harmony export (immutable) */ __webpack_exports__["i"] = isQueryInitAction;
/* harmony export (immutable) */ __webpack_exports__["k"] = isQueryResultClientAction;
/* harmony export (immutable) */ __webpack_exports__["l"] = isQueryStopAction;
/* harmony export (immutable) */ __webpack_exports__["a"] = isMutationInitAction;
/* harmony export (immutable) */ __webpack_exports__["c"] = isMutationResultAction;
/* harmony export (immutable) */ __webpack_exports__["b"] = isMutationErrorAction;
/* harmony export (immutable) */ __webpack_exports__["f"] = isUpdateQueryResultAction;
/* harmony export (immutable) */ __webpack_exports__["g"] = isStoreResetAction;
/* harmony export (immutable) */ __webpack_exports__["e"] = isSubscriptionResultAction;
/* harmony export (immutable) */ __webpack_exports__["h"] = isWriteAction;
function isQueryResultAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT';
}
function isQueryErrorAction(action) {
    return action.type === 'APOLLO_QUERY_ERROR';
}
function isQueryInitAction(action) {
    return action.type === 'APOLLO_QUERY_INIT';
}
function isQueryResultClientAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT_CLIENT';
}
function isQueryStopAction(action) {
    return action.type === 'APOLLO_QUERY_STOP';
}
function isMutationInitAction(action) {
    return action.type === 'APOLLO_MUTATION_INIT';
}
function isMutationResultAction(action) {
    return action.type === 'APOLLO_MUTATION_RESULT';
}
function isMutationErrorAction(action) {
    return action.type === 'APOLLO_MUTATION_ERROR';
}
function isUpdateQueryResultAction(action) {
    return action.type === 'APOLLO_UPDATE_QUERY_RESULT';
}
function isStoreResetAction(action) {
    return action.type === 'APOLLO_STORE_RESET';
}
function isSubscriptionResultAction(action) {
    return action.type === 'APOLLO_SUBSCRIPTION_RESULT';
}
function isWriteAction(action) {
    return action.type === 'APOLLO_WRITE';
}
//# sourceMappingURL=actions.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storeUtils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_directives__ = __webpack_require__(44);
/* harmony export (immutable) */ __webpack_exports__["a"] = writeQueryToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = writeResultToStore;
/* unused harmony export writeSelectionSetToStore */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




function writeQueryToStore(_a) {
    var result = _a.result, query = _a.query, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, _c = _a.fragmentMap, fragmentMap = _c === void 0 ? {} : _c;
    var queryDefinition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["b" /* getQueryDefinition */])(query);
    variables = Object.assign(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["e" /* getDefaultValues */])(queryDefinition), variables);
    return writeSelectionSetToStore({
        dataId: 'ROOT_QUERY',
        result: result,
        selectionSet: queryDefinition.selectionSet,
        context: {
            store: store,
            variables: variables,
            dataIdFromObject: dataIdFromObject,
            fragmentMap: fragmentMap,
        },
    });
}
function writeResultToStore(_a) {
    var result = _a.result, dataId = _a.dataId, document = _a.document, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject;
    var operationDefinition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["f" /* getOperationDefinition */])(document);
    var selectionSet = operationDefinition.selectionSet;
    var fragmentMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["a" /* createFragmentMap */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["c" /* getFragmentDefinitions */])(document));
    variables = Object.assign(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["e" /* getDefaultValues */])(operationDefinition), variables);
    return writeSelectionSetToStore({
        result: result,
        dataId: dataId,
        selectionSet: selectionSet,
        context: {
            store: store,
            variables: variables,
            dataIdFromObject: dataIdFromObject,
            fragmentMap: fragmentMap,
        },
    });
}
function writeSelectionSetToStore(_a) {
    var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
    var variables = context.variables, store = context.store, dataIdFromObject = context.dataIdFromObject, fragmentMap = context.fragmentMap;
    selectionSet.selections.forEach(function (selection) {
        var included = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__queries_directives__["a" /* shouldInclude */])(selection, variables);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["c" /* isField */])(selection)) {
            var resultFieldKey = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["d" /* resultKeyNameFromField */])(selection);
            var value = result[resultFieldKey];
            if (value !== undefined) {
                writeFieldToStore({
                    dataId: dataId,
                    value: value,
                    field: selection,
                    context: context,
                });
            }
        }
        else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["e" /* isInlineFragment */])(selection)) {
            if (included) {
                writeSelectionSetToStore({
                    result: result,
                    selectionSet: selection.selectionSet,
                    dataId: dataId,
                    context: context,
                });
            }
        }
        else {
            var fragment = void 0;
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["e" /* isInlineFragment */])(selection)) {
                fragment = selection;
            }
            else {
                fragment = (fragmentMap || {})[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value + ".");
                }
            }
            if (included) {
                writeSelectionSetToStore({
                    result: result,
                    selectionSet: fragment.selectionSet,
                    dataId: dataId,
                    context: context,
                });
            }
        }
    });
    return store;
}
function isGeneratedId(id) {
    return (id[0] === '$');
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    var generated = cache[generatedKey];
    var real = cache[realKey];
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(value)
            && isGeneratedId(value.id)
            && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(realValue)) {
            mergeWithGenerated(value.id, realValue.id, cache);
        }
        delete cache[generatedKey];
        cache[realKey] = __assign({}, generated, real);
    });
}
function writeFieldToStore(_a) {
    var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
    var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store, fragmentMap = context.fragmentMap;
    var storeValue;
    var storeFieldName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["g" /* storeKeyNameFromField */])(field, variables);
    var shouldMerge = false;
    var generatedKey = '';
    if (!field.selectionSet || value === null) {
        storeValue =
            value != null && typeof value === 'object'
                ? { type: 'json', json: value }
                : value;
    }
    else if (Array.isArray(value)) {
        var generatedId = dataId + "." + storeFieldName;
        storeValue = processArrayValue(value, generatedId, field.selectionSet, context);
    }
    else {
        var valueDataId = dataId + "." + storeFieldName;
        var generated = true;
        if (!isGeneratedId(valueDataId)) {
            valueDataId = '$' + valueDataId;
        }
        if (dataIdFromObject) {
            var semanticId = dataIdFromObject(value);
            if (semanticId && isGeneratedId(semanticId)) {
                throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
            }
            if (semanticId) {
                valueDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: valueDataId,
            result: value,
            selectionSet: field.selectionSet,
            context: context,
        });
        storeValue = {
            type: 'id',
            id: valueDataId,
            generated: generated,
        };
        if (store[dataId] && store[dataId][storeFieldName] !== storeValue) {
            var escapedId = store[dataId][storeFieldName];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(storeValue) && storeValue.generated
                && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(escapedId) && !escapedId.generated) {
                throw new Error("Store error: the application attempted to write an object with no provided id" +
                    (" but the store already contains an id of " + escapedId.id + " for this object."));
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__storeUtils__["f" /* isIdValue */])(escapedId) && escapedId.generated) {
                generatedKey = escapedId.id;
                shouldMerge = true;
            }
        }
    }
    var newStoreObj = __assign({}, store[dataId], (_b = {}, _b[storeFieldName] = storeValue, _b));
    if (shouldMerge) {
        mergeWithGenerated(generatedKey, storeValue.id, store);
    }
    if (!store[dataId] || storeValue !== store[dataId][storeFieldName]) {
        store[dataId] = newStoreObj;
    }
    var _b;
}
function processArrayValue(value, generatedId, selectionSet, context) {
    return value.map(function (item, index) {
        if (item === null) {
            return null;
        }
        var itemDataId = generatedId + "." + index;
        if (Array.isArray(item)) {
            return processArrayValue(item, itemDataId, selectionSet, context);
        }
        var generated = true;
        if (context.dataIdFromObject) {
            var semanticId = context.dataIdFromObject(item);
            if (semanticId) {
                itemDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: itemDataId,
            result: item,
            selectionSet: selectionSet,
            context: context,
        });
        var idStoreValue = {
            type: 'id',
            id: itemDataId,
            generated: generated,
        };
        return idStoreValue;
    });
}
//# sourceMappingURL=writeToStore.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkStatus; });
/* harmony export (immutable) */ __webpack_exports__["b"] = isNetworkRequestInFlight;
var NetworkStatus;
(function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
}
//# sourceMappingURL=networkStatus.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export getEnv */
/* unused harmony export isEnv */
/* harmony export (immutable) */ __webpack_exports__["a"] = isProduction;
/* harmony export (immutable) */ __webpack_exports__["b"] = isDevelopment;
/* harmony export (immutable) */ __webpack_exports__["c"] = isTest;
function getEnv() {
    if (typeof process !== 'undefined' && process.env.NODE_ENV) {
        return process.env.NODE_ENV;
    }
    return 'development';
}
function isEnv(env) {
    return getEnv() === env;
}
function isProduction() {
    return isEnv('production') === true;
}
function isDevelopment() {
    return isEnv('development') === true;
}
function isTest() {
    return isEnv('test') === true;
}
//# sourceMappingURL=environment.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isEqual;
function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a != null && typeof a === 'object' && b != null && typeof b === 'object') {
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                if (!b.hasOwnProperty(key)) {
                    return false;
                }
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=isEqual.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _visitor = __webpack_require__(67);

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, { leave: printDocASTReducer });
} /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },

  // Document

  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },

  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet;
    // Anonymous queries with no directives or variable definitions can use
    // the query short form.
    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },


  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue;
    return variable + ': ' + type + wrap(' = ', defaultValue);
  },

  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },

  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },

  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },

  // Fragments

  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },

  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },

  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return 'fragment ' + name + ' on ' + typeCondition + ' ' + wrap('', join(directives, ' '), ' ') + selectionSet;
  },

  // Value

  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10) {
    var value = _ref10.value;
    return JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return JSON.stringify(value);
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },

  // Directive

  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },

  // Type

  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },

  // Type System Definitions

  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },

  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },

  ScalarTypeDefinition: function ScalarTypeDefinition(_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  },

  ObjectTypeDefinition: function ObjectTypeDefinition(_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ', ')), join(directives, ' '), block(fields)], ' ');
  },

  FieldDefinition: function FieldDefinition(_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + wrap('(', join(args, ', '), ')') + ': ' + type + wrap(' ', join(directives, ' '));
  },

  InputValueDefinition: function InputValueDefinition(_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  },

  InterfaceTypeDefinition: function InterfaceTypeDefinition(_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  },

  UnionTypeDefinition: function UnionTypeDefinition(_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), '= ' + join(types, ' | ')], ' ');
  },

  EnumTypeDefinition: function EnumTypeDefinition(_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  },

  EnumValueDefinition: function EnumValueDefinition(_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  },

  InputObjectTypeDefinition: function InputObjectTypeDefinition(_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  },

  TypeExtensionDefinition: function TypeExtensionDefinition(_ref31) {
    var definition = _ref31.definition;
    return 'extend ' + definition;
  },

  DirectiveDefinition: function DirectiveDefinition(_ref32) {
    var name = _ref32.name,
        args = _ref32.arguments,
        locations = _ref32.locations;
    return 'directive @' + name + wrap('(', join(args, ', '), ')') + ' on ' + join(locations, ' | ');
  }
};

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}

/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
  return array && array.length !== 0 ? indent('{\n' + join(array, '\n')) + '\n}' : '{}';
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && maybeString.replace(/\n/g, '\n  ');
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Observable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_ApolloError__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_errorHandling__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_isEqual__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_maybeDeepFreeze__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__queries_networkStatus__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservableQuery; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







var ObservableQuery = (function (_super) {
    __extends(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var scheduler = _a.scheduler, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
        var _this = this;
        var queryManager = scheduler.queryManager;
        var queryId = queryManager.generateQueryId();
        var subscriberFunction = function (observer) {
            return _this.onSubscribe(observer);
        };
        _this = _super.call(this, subscriberFunction) || this;
        _this.isCurrentlyPolling = false;
        _this.options = options;
        _this.variables = _this.options.variables || {};
        _this.scheduler = scheduler;
        _this.queryManager = queryManager;
        _this.queryId = queryId;
        _this.shouldSubscribe = shouldSubscribe;
        _this.observers = [];
        _this.subscriptionHandles = [];
        return _this;
    }
    ObservableQuery.prototype.result = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            var subscription = null;
            var observer = {
                next: function (result) {
                    resolve(result);
                    var selectedObservers = that.observers.filter(function (obs) { return obs !== observer; });
                    if (selectedObservers.length === 0) {
                        that.queryManager.removeQuery(that.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: function (error) {
                    reject(error);
                },
            };
            subscription = that.subscribe(observer);
        });
    };
    ObservableQuery.prototype.currentResult = function () {
        var _a = this.queryManager.getCurrentQueryResult(this, true), data = _a.data, partial = _a.partial;
        var queryStoreValue = this.queryManager.getApolloState().queries[this.queryId];
        if (queryStoreValue && ((queryStoreValue.graphQLErrors && queryStoreValue.graphQLErrors.length > 0) ||
            queryStoreValue.networkError)) {
            var error = new __WEBPACK_IMPORTED_MODULE_1__errors_ApolloError__["a" /* ApolloError */]({
                graphQLErrors: queryStoreValue.graphQLErrors,
                networkError: queryStoreValue.networkError,
            });
            return { data: {}, loading: false, networkStatus: queryStoreValue.networkStatus, error: error };
        }
        var queryLoading = !queryStoreValue || queryStoreValue.networkStatus === __WEBPACK_IMPORTED_MODULE_6__queries_networkStatus__["a" /* NetworkStatus */].loading;
        var loading = (this.options.fetchPolicy === 'network-only' && queryLoading)
            || (partial && this.options.fetchPolicy !== 'cache-only');
        var networkStatus;
        if (queryStoreValue) {
            networkStatus = queryStoreValue.networkStatus;
        }
        else {
            networkStatus = loading ? __WEBPACK_IMPORTED_MODULE_6__queries_networkStatus__["a" /* NetworkStatus */].loading : __WEBPACK_IMPORTED_MODULE_6__queries_networkStatus__["a" /* NetworkStatus */].ready;
        }
        return {
            data: data,
            loading: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__queries_networkStatus__["b" /* isNetworkRequestInFlight */])(networkStatus),
            networkStatus: networkStatus,
            partial: partial,
        };
    };
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.refetch = function (variables) {
        this.variables = __assign({}, this.variables, variables);
        if (this.options.fetchPolicy === 'cache-only') {
            return Promise.reject(new Error('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        this.options.variables = __assign({}, this.options.variables, this.variables);
        var combinedOptions = __assign({}, this.options, { fetchPolicy: 'network-only' });
        return this.queryManager.fetchQuery(this.queryId, combinedOptions, __WEBPACK_IMPORTED_MODULE_2__types__["a" /* FetchType */].refetch)
            .then(function (result) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_maybeDeepFreeze__["a" /* default */])(result); });
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        if (!fetchMoreOptions.updateQuery) {
            throw new Error('updateQuery option is required. This function defines how to update the query data with the new results.');
        }
        return Promise.resolve()
            .then(function () {
            var qid = _this.queryManager.generateQueryId();
            var combinedOptions = null;
            if (fetchMoreOptions.query) {
                combinedOptions = fetchMoreOptions;
            }
            else {
                var variables = __assign({}, _this.variables, fetchMoreOptions.variables);
                combinedOptions = __assign({}, _this.options, fetchMoreOptions, { variables: variables });
            }
            combinedOptions = __assign({}, combinedOptions, { query: combinedOptions.query, fetchPolicy: 'network-only' });
            return _this.queryManager.fetchQuery(qid, combinedOptions, __WEBPACK_IMPORTED_MODULE_2__types__["a" /* FetchType */].normal, _this.queryId);
        })
            .then(function (fetchMoreResult) {
            var data = fetchMoreResult.data;
            var reducer = fetchMoreOptions.updateQuery;
            var mapFn = function (previousResult, _a) {
                var variables = _a.variables;
                var queryVariables = variables;
                return reducer(previousResult, {
                    fetchMoreResult: data,
                    queryVariables: queryVariables,
                });
            };
            _this.updateQuery(mapFn);
            return fetchMoreResult;
        });
    };
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var observable = this.queryManager.startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
        });
        var subscription = observable.subscribe({
            next: function (data) {
                if (options.updateQuery) {
                    var reducer_1 = options.updateQuery;
                    var mapFn = function (previousResult, _a) {
                        var variables = _a.variables;
                        return reducer_1(previousResult, {
                            subscriptionData: { data: data },
                            variables: variables,
                        });
                    };
                    _this.updateQuery(mapFn);
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                }
                else {
                    console.error('Unhandled GraphQL subscription error', err);
                }
            },
        });
        this.subscriptionHandles.push(subscription);
        return function () {
            var i = _this.subscriptionHandles.indexOf(subscription);
            if (i >= 0) {
                _this.subscriptionHandles.splice(i, 1);
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (opts) {
        var oldOptions = this.options;
        this.options = __assign({}, this.options, opts);
        if (opts.pollInterval) {
            this.startPolling(opts.pollInterval);
        }
        else if (opts.pollInterval === 0) {
            this.stopPolling();
        }
        var tryFetch = (oldOptions.fetchPolicy !== 'network-only' && opts.fetchPolicy === 'network-only')
            || (oldOptions.fetchPolicy === 'cache-only' && opts.fetchPolicy !== 'cache-only')
            || false;
        return this.setVariables(this.options.variables, tryFetch);
    };
    ObservableQuery.prototype.setVariables = function (variables, tryFetch) {
        if (tryFetch === void 0) { tryFetch = false; }
        var newVariables = __assign({}, this.variables, variables);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isEqual__["a" /* isEqual */])(newVariables, this.variables) && !tryFetch) {
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.result();
        }
        else {
            this.variables = newVariables;
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.queryManager.fetchQuery(this.queryId, __assign({}, this.options, { variables: this.variables }))
                .then(function (result) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_maybeDeepFreeze__["a" /* default */])(result); });
        }
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var _a = this.queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
        var newResult = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_errorHandling__["a" /* tryFunctionOrLogError */])(function () { return mapFn(previousResult, { variables: variables }); });
        if (newResult) {
            this.queryManager.store.dispatch({
                type: 'APOLLO_UPDATE_QUERY_RESULT',
                newResult: newResult,
                variables: variables,
                document: document,
            });
        }
    };
    ObservableQuery.prototype.stopPolling = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.options.pollInterval = undefined;
            this.isCurrentlyPolling = false;
        }
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        if (this.options.fetchPolicy === 'cache-first' || (this.options.fetchPolicy === 'cache-only')) {
            throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
        }
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.options.pollInterval = pollInterval;
        this.isCurrentlyPolling = true;
        this.scheduler.startPollingQuery(this.options, this.queryId);
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        this.observers.push(observer);
        if (observer.next && this.lastResult) {
            observer.next(this.lastResult);
        }
        if (observer.error && this.lastError) {
            observer.error(this.lastError);
        }
        if (this.observers.length === 1) {
            this.setUpQuery();
        }
        var retQuerySubscription = {
            unsubscribe: function () {
                if (!_this.observers.some(function (el) { return el === observer; })) {
                    return;
                }
                _this.observers = _this.observers.filter(function (obs) { return obs !== observer; });
                if (_this.observers.length === 0) {
                    _this.tearDownQuery();
                }
            },
        };
        return retQuerySubscription;
    };
    ObservableQuery.prototype.setUpQuery = function () {
        var _this = this;
        if (this.shouldSubscribe) {
            this.queryManager.addObservableQuery(this.queryId, this);
        }
        if (!!this.options.pollInterval) {
            if (this.options.fetchPolicy === 'cache-first' || (this.options.fetchPolicy === 'cache-only')) {
                throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
            }
            this.isCurrentlyPolling = true;
            this.scheduler.startPollingQuery(this.options, this.queryId);
        }
        var observer = {
            next: function (result) {
                _this.lastResult = result;
                _this.observers.forEach(function (obs) {
                    if (obs.next) {
                        obs.next(result);
                    }
                });
            },
            error: function (error) {
                _this.observers.forEach(function (obs) {
                    if (obs.error) {
                        obs.error(error);
                    }
                    else {
                        console.error('Unhandled error', error.message, error.stack);
                    }
                });
                _this.lastError = error;
            },
        };
        this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, observer));
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.subscriptionHandles.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptionHandles = [];
        this.queryManager.stopQuery(this.queryId);
        if (this.shouldSubscribe) {
            this.queryManager.removeObservableQuery(this.queryId);
        }
        this.observers = [];
    };
    return ObservableQuery;
}(__WEBPACK_IMPORTED_MODULE_0__util_Observable__["a" /* Observable */]));

//# sourceMappingURL=ObservableQuery.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchType; });
var FetchType;
(function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));
//# sourceMappingURL=types.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_environment__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntrospectionFragmentMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeuristicFragmentMatcher; });

var IntrospectionFragmentMatcher = (function () {
    function IntrospectionFragmentMatcher(options) {
        if (options && options.introspectionQueryResultData) {
            this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
            this.isReady = true;
        }
        else {
            this.isReady = false;
        }
        this.match = this.match.bind(this);
    }
    IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        if (!this.isReady) {
            throw new Error('FragmentMatcher.match() was called before FragmentMatcher.init()');
        }
        var obj = context.store[idValue.id];
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            throw new Error("Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        var implementingTypes = this.possibleTypesMap[typeCondition];
        if (implementingTypes && implementingTypes.indexOf(obj.__typename) > -1) {
            return true;
        }
        return false;
    };
    IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
        var typeMap = {};
        introspectionResultData.__schema.types.forEach(function (type) {
            if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
                typeMap[type.name] = type.possibleTypes.map(function (implementingType) { return implementingType.name; });
            }
        });
        return typeMap;
    };
    return IntrospectionFragmentMatcher;
}());

var haveWarned = false;
var HeuristicFragmentMatcher = (function () {
    function HeuristicFragmentMatcher() {
    }
    HeuristicFragmentMatcher.prototype.ensureReady = function () {
        return Promise.resolve();
    };
    HeuristicFragmentMatcher.prototype.canBypassInit = function () {
        return true;
    };
    HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        var obj = context.store[idValue.id];
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            if (!haveWarned) {
                console.warn("You're using fragments in your queries, but don't have the addTypename:\n  true option set in Apollo Client. Please turn on that option so that we can accurately\n  match fragments.");
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_environment__["c" /* isTest */])()) {
                    haveWarned = true;
                }
            }
            context.returnPartialData = true;
            return true;
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        context.returnPartialData = true;
        return true;
    };
    return HeuristicFragmentMatcher;
}());

//# sourceMappingURL=fragmentMatcher.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isApolloError;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApolloError; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
var generateErrorMessage = function (err) {
    var message = '';
    if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length !== 0) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError ? graphQLError.message : 'Error message not found.';
            message += "GraphQL error: " + errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += 'Network error: ' + err.networkError.message + '\n';
    }
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    __extends(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        if (!errorMessage) {
            _this.message = generateErrorMessage(_this);
        }
        else {
            _this.message = errorMessage;
        }
        _this.extraInfo = extraInfo;
        return _this;
    }
    return ApolloError;
}(Error));

//# sourceMappingURL=ApolloError.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_cloneDeep__ = __webpack_require__(50);
/* harmony export (immutable) */ __webpack_exports__["a"] = addTypenameToDocument;


var TYPENAME_FIELD = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function addTypenameToSelectionSet(selectionSet, isRoot) {
    if (isRoot === void 0) { isRoot = false; }
    if (selectionSet.selections) {
        if (!isRoot) {
            var alreadyHasThisField = selectionSet.selections.some(function (selection) {
                return selection.kind === 'Field' && selection.name.value === '__typename';
            });
            if (!alreadyHasThisField) {
                selectionSet.selections.push(TYPENAME_FIELD);
            }
        }
        selectionSet.selections.forEach(function (selection) {
            if (selection.kind === 'Field') {
                if (selection.name.value.lastIndexOf('__', 0) !== 0 && selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
            else if (selection.kind === 'InlineFragment') {
                if (selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
        });
    }
}
function addTypenameToDocument(doc) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getFromAST__["i" /* checkDocument */])(doc);
    var docClone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_cloneDeep__["a" /* cloneDeep */])(doc);
    docClone.definitions.forEach(function (definition) {
        var isRoot = definition.kind === 'OperationDefinition';
        addTypenameToSelectionSet(definition.selectionSet, isRoot);
    });
    return docClone;
}
//# sourceMappingURL=queryTransform.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_store__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_store__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations_store__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__optimistic_data_store__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__optimistic_data_store__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["b"] = createApolloReducer;
/* harmony export (immutable) */ __webpack_exports__["a"] = createApolloStore;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







var crashReporter = function (store) { return function (next) { return function (action) {
    try {
        return next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err);
        console.error(err.stack);
        throw err;
    }
}; }; };
var createReducerError = function (error, action) {
    var reducerError = { error: error };
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__actions__["d" /* isQueryResultAction */])(action)) {
        reducerError.queryId = action.queryId;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__actions__["e" /* isSubscriptionResultAction */])(action)) {
        reducerError.subscriptionId = action.subscriptionId;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__actions__["c" /* isMutationResultAction */])(action)) {
        reducerError.mutationId = action.mutationId;
    }
    return reducerError;
};
function createApolloReducer(config) {
    return function apolloReducer(state, action) {
        if (state === void 0) { state = {}; }
        try {
            var newState = {
                queries: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__queries_store__["a" /* queries */])(state.queries, action),
                mutations: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__mutations_store__["a" /* mutations */])(state.mutations, action),
                data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__data_store__["a" /* data */])(state.data, action, state.queries, state.mutations, config),
                optimistic: [],
                reducerError: null,
            };
            newState.optimistic = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__optimistic_data_store__["b" /* optimistic */])(state.optimistic, action, newState, config);
            if (state.data === newState.data &&
                state.mutations === newState.mutations &&
                state.queries === newState.queries &&
                state.optimistic === newState.optimistic &&
                state.reducerError === newState.reducerError) {
                return state;
            }
            return newState;
        }
        catch (reducerError) {
            return __assign({}, state, { reducerError: createReducerError(reducerError, action) });
        }
    };
}
function createApolloStore(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.reduxRootKey, reduxRootKey = _c === void 0 ? 'apollo' : _c, initialState = _b.initialState, _d = _b.config, config = _d === void 0 ? {} : _d, _e = _b.reportCrashes, reportCrashes = _e === void 0 ? true : _e, logger = _b.logger;
    var enhancers = [];
    var middlewares = [];
    if (reportCrashes) {
        middlewares.push(crashReporter);
    }
    if (logger) {
        middlewares.push(logger);
    }
    if (middlewares.length > 0) {
        enhancers.push(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* applyMiddleware */].apply(void 0, middlewares));
    }
    if (typeof window !== 'undefined') {
        var anyWindow = window;
        if (anyWindow.devToolsExtension) {
            enhancers.push(anyWindow.devToolsExtension());
        }
    }
    var compose = __WEBPACK_IMPORTED_MODULE_0_redux__["b" /* compose */];
    if (initialState && initialState[reduxRootKey] && initialState[reduxRootKey]['queries']) {
        throw new Error('Apollo initial state may not contain queries, only data');
    }
    if (initialState && initialState[reduxRootKey] && initialState[reduxRootKey]['mutations']) {
        throw new Error('Apollo initial state may not contain mutations, only data');
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["c" /* createStore */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["d" /* combineReducers */])((_f = {}, _f[reduxRootKey] = createApolloReducer(config), _f)), initialState, compose.apply(void 0, enhancers));
    var _f;
}
//# sourceMappingURL=store.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__);
/* harmony export (immutable) */ __webpack_exports__["c"] = printRequest;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BaseNetworkInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HTTPFetchNetworkInterface; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createNetworkInterface;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


function printRequest(request) {
    return __assign({}, request, { query: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__["print"])(request.query) });
}
var BaseNetworkInterface = (function () {
    function BaseNetworkInterface(uri, opts) {
        if (opts === void 0) { opts = {}; }
        if (!uri) {
            throw new Error('A remote endpoint is required for a network layer');
        }
        if (typeof uri !== 'string') {
            throw new Error('Remote endpoint must be a string');
        }
        this._uri = uri;
        this._opts = __assign({}, opts);
        this._middlewares = [];
        this._afterwares = [];
    }
    BaseNetworkInterface.prototype.query = function (request) {
        return new Promise(function (resolve, reject) {
            reject(new Error('BaseNetworkInterface should not be used directly'));
        });
    };
    return BaseNetworkInterface;
}());

var HTTPFetchNetworkInterface = (function (_super) {
    __extends(HTTPFetchNetworkInterface, _super);
    function HTTPFetchNetworkInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTTPFetchNetworkInterface.prototype.applyMiddlewares = function (requestAndOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = requestAndOptions.request, options = requestAndOptions.options;
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyMiddleware.apply(scope, [{ request: request, options: options }, next]);
                        }
                    }
                    else {
                        resolve({
                            request: request,
                            options: options,
                        });
                    }
                };
                next();
            };
            queue(_this._middlewares.slice(), _this);
        });
    };
    HTTPFetchNetworkInterface.prototype.applyAfterwares = function (_a) {
        var _this = this;
        var response = _a.response, options = _a.options;
        return new Promise(function (resolve, reject) {
            var responseObject = { response: response, options: options };
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyAfterware.apply(scope, [responseObject, next]);
                        }
                    }
                    else {
                        resolve(responseObject);
                    }
                };
                next();
            };
            queue(_this._afterwares.slice(), _this);
        });
    };
    HTTPFetchNetworkInterface.prototype.fetchFromRemoteEndpoint = function (_a) {
        var request = _a.request, options = _a.options;
        return fetch(this._uri, __assign({}, this._opts, { body: JSON.stringify(printRequest(request)), method: 'POST' }, options, { headers: __assign({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers) }));
    };
    HTTPFetchNetworkInterface.prototype.query = function (request) {
        var _this = this;
        var options = __assign({}, this._opts);
        return this.applyMiddlewares({
            request: request,
            options: options,
        }).then(function (rao) { return _this.fetchFromRemoteEndpoint.call(_this, rao); })
            .then(function (response) { return _this.applyAfterwares({
            response: response,
            options: options,
        }); })
            .then(function (_a) {
            var response = _a.response;
            var httpResponse = response;
            return httpResponse.json().catch(function (error) {
                var httpError = new Error("Network request failed with status " + response.status + " - \"" + response.statusText + "\"");
                httpError.response = httpResponse;
                httpError.parseError = error;
                throw httpError;
            });
        })
            .then(function (payload) {
            if (!payload.hasOwnProperty('data') && !payload.hasOwnProperty('errors')) {
                throw new Error("Server response was missing for query '" + request.debugName + "'.");
            }
            else {
                return payload;
            }
        });
    };
    HTTPFetchNetworkInterface.prototype.use = function (middlewares) {
        var _this = this;
        middlewares.map(function (middleware) {
            if (typeof middleware.applyMiddleware === 'function') {
                _this._middlewares.push(middleware);
            }
            else {
                throw new Error('Middleware must implement the applyMiddleware function');
            }
        });
        return this;
    };
    HTTPFetchNetworkInterface.prototype.useAfter = function (afterwares) {
        var _this = this;
        afterwares.map(function (afterware) {
            if (typeof afterware.applyAfterware === 'function') {
                _this._afterwares.push(afterware);
            }
            else {
                throw new Error('Afterware must implement the applyAfterware function');
            }
        });
        return this;
    };
    return HTTPFetchNetworkInterface;
}(BaseNetworkInterface));

function createNetworkInterface(uriOrInterfaceOpts, secondArgOpts) {
    if (secondArgOpts === void 0) { secondArgOpts = {}; }
    if (!uriOrInterfaceOpts) {
        throw new Error('You must pass an options argument to createNetworkInterface.');
    }
    var uri;
    var opts;
    if (typeof uriOrInterfaceOpts === 'string') {
        console.warn("Passing the URI as the first argument to createNetworkInterface is deprecated as of Apollo Client 0.5. Please pass it as the \"uri\" property of the network interface options.");
        opts = secondArgOpts;
        uri = uriOrInterfaceOpts;
    }
    else {
        opts = uriOrInterfaceOpts.opts;
        uri = uriOrInterfaceOpts.uri;
    }
    return new HTTPFetchNetworkInterface(uri, opts);
}
//# sourceMappingURL=networkInterface.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLError = GraphQLError;

var _location = __webpack_require__(28);

/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
function GraphQLError( // eslint-disable-line no-redeclare
message, nodes, source, positions, path, originalError) {
  // Include (non-enumerable) stack trace.
  if (originalError && originalError.stack) {
    Object.defineProperty(this, 'stack', {
      value: originalError.stack,
      writable: true,
      configurable: true
    });
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, GraphQLError);
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true,
      configurable: true
    });
  }

  // Compute locations in the source for the given nodes/positions.
  var _source = source;
  if (!_source && nodes && nodes.length > 0) {
    var node = nodes[0];
    _source = node && node.loc && node.loc.source;
  }

  var _positions = positions;
  if (!_positions && nodes) {
    _positions = nodes.filter(function (node) {
      return Boolean(node.loc);
    }).map(function (node) {
      return node.loc.start;
    });
  }
  if (_positions && _positions.length === 0) {
    _positions = undefined;
  }

  var _locations = void 0;
  var _source2 = _source; // seems here Flow need a const to resolve type.
  if (_source2 && _positions) {
    _locations = _positions.map(function (pos) {
      return (0, _location.getLocation)(_source2, pos);
    });
  }

  Object.defineProperties(this, {
    message: {
      value: message,
      // By being enumerable, JSON.stringify will include `message` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true,
      writable: true
    },
    locations: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _locations || undefined,
      // By being enumerable, JSON.stringify will include `locations` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    path: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: path || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    nodes: {
      value: nodes || undefined
    },
    source: {
      value: _source || undefined
    },
    positions: {
      value: _positions || undefined
    },
    originalError: {
      value: originalError
    }
  });
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

GraphQLError.prototype = Object.create(Error.prototype, {
  constructor: { value: GraphQLError },
  name: { value: 'GraphQLError' }
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 18 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__optimistic_data_store__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__readFromStore__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__writeToStore__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReduxDataProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TransactionDataProxy; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var ReduxDataProxy = (function () {
    function ReduxDataProxy(store, reduxRootSelector, fragmentMatcher, reducerConfig) {
        this.store = store;
        this.reduxRootSelector = reduxRootSelector;
        this.reducerConfig = reducerConfig;
        this.fragmentMatcher = fragmentMatcher;
    }
    ReduxDataProxy.prototype.readQuery = function (_a) {
        var query = _a.query, variables = _a.variables;
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__readFromStore__["a" /* readQueryFromStore */])({
            rootId: 'ROOT_QUERY',
            store: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__optimistic_data_store__["a" /* getDataWithOptimisticResults */])(this.reduxRootSelector(this.store.getState())),
            query: query,
            variables: variables,
            fragmentMatcherFunction: this.fragmentMatcher.match,
            config: this.reducerConfig,
        });
    };
    ReduxDataProxy.prototype.readFragment = function (_a) {
        var id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        var query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["d" /* getFragmentQueryDocument */])(fragment, fragmentName);
        var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__optimistic_data_store__["a" /* getDataWithOptimisticResults */])(this.reduxRootSelector(this.store.getState()));
        if (typeof data[id] === 'undefined') {
            return null;
        }
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__readFromStore__["a" /* readQueryFromStore */])({
            rootId: id,
            store: data,
            query: query,
            variables: variables,
            fragmentMatcherFunction: this.fragmentMatcher.match,
            config: this.reducerConfig,
        });
    };
    ReduxDataProxy.prototype.writeQuery = function (_a) {
        var data = _a.data, query = _a.query, variables = _a.variables;
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        this.store.dispatch({
            type: 'APOLLO_WRITE',
            writes: [{
                    rootId: 'ROOT_QUERY',
                    result: data,
                    document: query,
                    variables: variables || {},
                }],
        });
    };
    ReduxDataProxy.prototype.writeFragment = function (_a) {
        var data = _a.data, id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        var document = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["d" /* getFragmentQueryDocument */])(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            document = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(document);
        }
        this.store.dispatch({
            type: 'APOLLO_WRITE',
            writes: [{
                    rootId: id,
                    result: data,
                    document: document,
                    variables: variables || {},
                }],
        });
    };
    return ReduxDataProxy;
}());

var TransactionDataProxy = (function () {
    function TransactionDataProxy(data, reducerConfig) {
        this.data = __assign({}, data);
        this.reducerConfig = reducerConfig;
        this.writes = [];
        this.isFinished = false;
    }
    TransactionDataProxy.prototype.finish = function () {
        this.assertNotFinished();
        var writes = this.writes;
        this.writes = [];
        this.isFinished = true;
        return writes;
    };
    TransactionDataProxy.prototype.readQuery = function (_a) {
        var query = _a.query, variables = _a.variables;
        this.assertNotFinished();
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__readFromStore__["a" /* readQueryFromStore */])({
            rootId: 'ROOT_QUERY',
            store: this.data,
            query: query,
            variables: variables,
            config: this.reducerConfig,
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
    };
    TransactionDataProxy.prototype.readFragment = function (_a) {
        var id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        this.assertNotFinished();
        var data = this.data;
        var query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["d" /* getFragmentQueryDocument */])(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        if (typeof data[id] === 'undefined') {
            return null;
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__readFromStore__["a" /* readQueryFromStore */])({
            rootId: id,
            store: data,
            query: query,
            variables: variables,
            config: this.reducerConfig,
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
    };
    TransactionDataProxy.prototype.writeQuery = function (_a) {
        var data = _a.data, query = _a.query, variables = _a.variables;
        this.assertNotFinished();
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        this.applyWrite({
            rootId: 'ROOT_QUERY',
            result: data,
            document: query,
            variables: variables || {},
        });
    };
    TransactionDataProxy.prototype.writeFragment = function (_a) {
        var data = _a.data, id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        this.assertNotFinished();
        var query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__queries_getFromAST__["d" /* getFragmentQueryDocument */])(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__queries_queryTransform__["a" /* addTypenameToDocument */])(query);
        }
        this.applyWrite({
            rootId: id,
            result: data,
            document: query,
            variables: variables || {},
        });
    };
    TransactionDataProxy.prototype.assertNotFinished = function () {
        if (this.isFinished) {
            throw new Error('Cannot call transaction methods after the transaction has finished.');
        }
    };
    TransactionDataProxy.prototype.applyWrite = function (write) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__writeToStore__["b" /* writeResultToStore */])({
            result: write.result,
            dataId: write.rootId,
            document: write.document,
            variables: write.variables,
            store: this.data,
            dataIdFromObject: this.reducerConfig.dataIdFromObject || (function () { return null; }),
        });
        this.writes.push(write);
    };
    return TransactionDataProxy;
}());

//# sourceMappingURL=proxy.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__writeToStore__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_proxy__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__queries_getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storeUtils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__replaceQueryResults__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__readFromStore__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_errorHandling__ = __webpack_require__(24);
/* harmony export (immutable) */ __webpack_exports__["a"] = data;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};








function data(previousState, action, queries, mutations, config) {
    if (previousState === void 0) { previousState = {}; }
    var constAction = action;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["d" /* isQueryResultAction */])(action)) {
        if (!queries[action.queryId]) {
            return previousState;
        }
        if (action.requestId < queries[action.queryId].lastRequestId) {
            return previousState;
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__storeUtils__["i" /* graphQLResultHasError */])(action.result)) {
            var queryStoreValue = queries[action.queryId];
            var clonedState = __assign({}, previousState);
            var newState_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__writeToStore__["b" /* writeResultToStore */])({
                result: action.result.data,
                dataId: 'ROOT_QUERY',
                document: action.document,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
            });
            if (action.extraReducers) {
                action.extraReducers.forEach(function (reducer) {
                    newState_1 = reducer(newState_1, constAction);
                });
            }
            return newState_1;
        }
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["e" /* isSubscriptionResultAction */])(action)) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__storeUtils__["i" /* graphQLResultHasError */])(action.result)) {
            var clonedState = __assign({}, previousState);
            var newState_2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__writeToStore__["b" /* writeResultToStore */])({
                result: action.result.data,
                dataId: 'ROOT_SUBSCRIPTION',
                document: action.document,
                variables: action.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
            });
            if (action.extraReducers) {
                action.extraReducers.forEach(function (reducer) {
                    newState_2 = reducer(newState_2, constAction);
                });
            }
            return newState_2;
        }
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["c" /* isMutationResultAction */])(constAction)) {
        if (!constAction.result.errors) {
            var queryStoreValue = mutations[constAction.mutationId];
            var clonedState = __assign({}, previousState);
            var newState_3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__writeToStore__["b" /* writeResultToStore */])({
                result: constAction.result.data,
                dataId: 'ROOT_MUTATION',
                document: constAction.document,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
            });
            var updateQueries_1 = constAction.updateQueries;
            if (updateQueries_1) {
                Object.keys(updateQueries_1).forEach(function (queryId) {
                    var query = queries[queryId];
                    if (!query) {
                        return;
                    }
                    var _a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__readFromStore__["b" /* diffQueryAgainstStore */])({
                        store: previousState,
                        query: query.document,
                        variables: query.variables,
                        returnPartialData: true,
                        fragmentMatcherFunction: config.fragmentMatcher,
                        config: config,
                    }), currentQueryResult = _a.result, isMissing = _a.isMissing;
                    if (isMissing) {
                        return;
                    }
                    var reducer = updateQueries_1[queryId];
                    var nextQueryResult = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util_errorHandling__["a" /* tryFunctionOrLogError */])(function () { return reducer(currentQueryResult, {
                        mutationResult: constAction.result,
                        queryName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__queries_getFromAST__["g" /* getOperationName */])(query.document),
                        queryVariables: query.variables,
                    }); });
                    if (nextQueryResult) {
                        newState_3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__writeToStore__["b" /* writeResultToStore */])({
                            result: nextQueryResult,
                            dataId: 'ROOT_QUERY',
                            document: query.document,
                            variables: query.variables,
                            store: newState_3,
                            dataIdFromObject: config.dataIdFromObject,
                        });
                    }
                });
            }
            if (constAction.update) {
                var update_1 = constAction.update;
                var proxy_1 = new __WEBPACK_IMPORTED_MODULE_2__data_proxy__["b" /* TransactionDataProxy */](newState_3, config);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util_errorHandling__["a" /* tryFunctionOrLogError */])(function () { return update_1(proxy_1, constAction.result); });
                var writes = proxy_1.finish();
                newState_3 = data(newState_3, { type: 'APOLLO_WRITE', writes: writes }, queries, mutations, config);
            }
            if (constAction.extraReducers) {
                constAction.extraReducers.forEach(function (reducer) {
                    newState_3 = reducer(newState_3, constAction);
                });
            }
            return newState_3;
        }
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["f" /* isUpdateQueryResultAction */])(constAction)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__replaceQueryResults__["a" /* replaceQueryResults */])(previousState, constAction, config);
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["g" /* isStoreResetAction */])(action)) {
        return {};
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["h" /* isWriteAction */])(action)) {
        return action.writes.reduce(function (currentState, write) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__writeToStore__["b" /* writeResultToStore */])({
            result: write.result,
            dataId: write.rootId,
            document: write.document,
            variables: write.variables,
            store: currentState,
            dataIdFromObject: config.dataIdFromObject,
        }); }, __assign({}, previousState));
    }
    return previousState;
}
//# sourceMappingURL=store.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_store__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_assign__ = __webpack_require__(23);
/* harmony export (immutable) */ __webpack_exports__["a"] = getDataWithOptimisticResults;
/* harmony export (immutable) */ __webpack_exports__["b"] = optimistic;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var optimisticDefaultState = [];
function getDataWithOptimisticResults(store) {
    if (store.optimistic.length === 0) {
        return store.data;
    }
    var patches = store.optimistic.map(function (opt) { return opt.data; });
    return __WEBPACK_IMPORTED_MODULE_2__util_assign__["a" /* assign */].apply(void 0, [{}, store.data].concat(patches));
}
function optimistic(previousState, action, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["a" /* isMutationInitAction */])(action) && action.optimisticResponse) {
        var fakeMutationResultAction = {
            type: 'APOLLO_MUTATION_RESULT',
            result: { data: action.optimisticResponse },
            document: action.mutation,
            operationName: action.operationName,
            variables: action.variables,
            mutationId: action.mutationId,
            extraReducers: action.extraReducers,
            updateQueries: action.updateQueries,
            update: action.update,
        };
        var optimisticData = getDataWithOptimisticResults(__assign({}, store, { optimistic: previousState }));
        var patch = getOptimisticDataPatch(optimisticData, fakeMutationResultAction, store.queries, store.mutations, config);
        var optimisticState = {
            action: fakeMutationResultAction,
            data: patch,
            mutationId: action.mutationId,
        };
        var newState = previousState.concat([optimisticState]);
        return newState;
    }
    else if ((__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["b" /* isMutationErrorAction */])(action) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["c" /* isMutationResultAction */])(action))
        && previousState.some(function (change) { return change.mutationId === action.mutationId; })) {
        return rollbackOptimisticData(function (change) { return change.mutationId === action.mutationId; }, previousState, store, config);
    }
    return previousState;
}
function getOptimisticDataPatch(previousData, optimisticAction, queries, mutations, config) {
    var optimisticData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__data_store__["a" /* data */])(previousData, optimisticAction, queries, mutations, config);
    var patch = {};
    Object.keys(optimisticData).forEach(function (key) {
        if (optimisticData[key] !== previousData[key]) {
            patch[key] = optimisticData[key];
        }
    });
    return patch;
}
function rollbackOptimisticData(filterFn, previousState, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    var optimisticData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_assign__["a" /* assign */])({}, store.data);
    var newState = previousState
        .filter(function (item) { return !filterFn(item); })
        .map(function (change) {
        var patch = getOptimisticDataPatch(optimisticData, change.action, store.queries, store.mutations, config);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_assign__["a" /* assign */])(optimisticData, patch);
        return __assign({}, change, { data: patch });
    });
    return newState;
}
//# sourceMappingURL=store.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_symbol_observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });

function isSubscription(subscription) {
    return subscription.unsubscribe !== undefined;
}
var Observable = (function () {
    function Observable(subscriberFunction) {
        this.subscriberFunction = subscriberFunction;
    }
    Observable.prototype[__WEBPACK_IMPORTED_MODULE_0_symbol_observable___default.a] = function () {
        return this;
    };
    Observable.prototype.subscribe = function (observer) {
        var subscriptionOrCleanupFunction = this.subscriberFunction(observer);
        if (isSubscription(subscriptionOrCleanupFunction)) {
            return subscriptionOrCleanupFunction;
        }
        else {
            return {
                unsubscribe: subscriptionOrCleanupFunction,
            };
        }
    };
    return Observable;
}());

//# sourceMappingURL=Observable.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = assign;
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) { return Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    }); });
    return target;
}
//# sourceMappingURL=assign.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tryFunctionOrLogError;
function tryFunctionOrLogError(f) {
    try {
        return f();
    }
    catch (e) {
        if (console.error) {
            console.error(e);
        }
    }
}
//# sourceMappingURL=errorHandling.js.map

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["a"] = maybeDeepFreeze;

function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop)
            && o[prop] !== null
            && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}
function maybeDeepFreeze(obj) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__environment__["b" /* isDevelopment */])() || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__environment__["c" /* isTest */])()) {
        return deepFreeze(obj);
    }
    return obj;
}
//# sourceMappingURL=maybeDeepFreeze.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getFromAST_1 = __webpack_require__(54);
var directives_1 = __webpack_require__(53);
var storeUtils_1 = __webpack_require__(56);
function graphql(resolver, document, rootValue, contextValue, variableValues, execOptions) {
    if (execOptions === void 0) { execOptions = {}; }
    var mainDefinition = getFromAST_1.getMainDefinition(document);
    var fragments = getFromAST_1.getFragmentDefinitions(document);
    var fragmentMap = getFromAST_1.createFragmentMap(fragments) || {};
    var resultMapper = execOptions.resultMapper;
    var fragmentMatcher = execOptions.fragmentMatcher || (function () { return true; });
    var execContext = {
        fragmentMap: fragmentMap,
        contextValue: contextValue,
        variableValues: variableValues,
        resultMapper: resultMapper,
        resolver: resolver,
        fragmentMatcher: fragmentMatcher,
    };
    return executeSelectionSet(mainDefinition.selectionSet, rootValue, execContext);
}
exports.graphql = graphql;
function executeSelectionSet(selectionSet, rootValue, execContext) {
    var fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
    var result = {};
    selectionSet.selections.forEach(function (selection) {
        if (!directives_1.shouldInclude(selection, variables)) {
            return;
        }
        if (storeUtils_1.isField(selection)) {
            var fieldResult = executeField(selection, rootValue, execContext);
            var resultFieldKey = storeUtils_1.resultKeyNameFromField(selection);
            if (fieldResult !== undefined) {
                result[resultFieldKey] = fieldResult;
            }
        }
        else {
            var fragment = void 0;
            if (storeUtils_1.isInlineFragment(selection)) {
                fragment = selection;
            }
            else {
                fragment = fragmentMap[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value);
                }
            }
            var typeCondition = fragment.typeCondition.name.value;
            if (execContext.fragmentMatcher(rootValue, typeCondition, contextValue)) {
                var fragmentResult = executeSelectionSet(fragment.selectionSet, rootValue, execContext);
                merge(result, fragmentResult);
            }
        }
    });
    if (execContext.resultMapper) {
        return execContext.resultMapper(result, rootValue);
    }
    return result;
}
function executeField(field, rootValue, execContext) {
    var variables = execContext.variableValues, contextValue = execContext.contextValue, resolver = execContext.resolver;
    var fieldName = field.name.value;
    var args = storeUtils_1.argumentsObjectFromField(field, variables);
    var info = {
        isLeaf: !field.selectionSet,
        resultKey: storeUtils_1.resultKeyNameFromField(field),
    };
    var result = resolver(fieldName, rootValue, args, contextValue, info);
    if (!field.selectionSet) {
        return result;
    }
    if (result === null || typeof result === 'undefined') {
        return result;
    }
    if (Array.isArray(result)) {
        return executeSubSelectedArray(field, result, execContext);
    }
    return executeSelectionSet(field.selectionSet, result, execContext);
}
function executeSubSelectedArray(field, result, execContext) {
    return result.map(function (item) {
        if (item === null) {
            return null;
        }
        if (Array.isArray(item)) {
            return executeSubSelectedArray(field, item, execContext);
        }
        return executeSelectionSet(field.selectionSet, item, execContext);
    });
}
function merge(dest, src) {
    if (src === null ||
        typeof src === 'undefined' ||
        typeof src === 'string' ||
        typeof src === 'number' ||
        typeof src === 'boolean') {
        return src;
    }
    Object.keys(dest).forEach(function (destKey) {
        if (src.hasOwnProperty(destKey)) {
            merge(dest[destKey], src[destKey]);
        }
    });
    Object.keys(src).forEach(function (srcKey) {
        if (!dest.hasOwnProperty(srcKey)) {
            dest[srcKey] = src[srcKey];
        }
    });
}
//# sourceMappingURL=graphql.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GraphQLError = __webpack_require__(16);

Object.defineProperty(exports, 'GraphQLError', {
  enumerable: true,
  get: function get() {
    return _GraphQLError.GraphQLError;
  }
});

var _syntaxError = __webpack_require__(61);

Object.defineProperty(exports, 'syntaxError', {
  enumerable: true,
  get: function get() {
    return _syntaxError.syntaxError;
  }
});

var _locatedError = __webpack_require__(60);

Object.defineProperty(exports, 'locatedError', {
  enumerable: true,
  get: function get() {
    return _locatedError.locatedError;
  }
});

var _formatError = __webpack_require__(59);

Object.defineProperty(exports, 'formatError', {
  enumerable: true,
  get: function get() {
    return _formatError.formatError;
  }
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;


/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match = void 0;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return { line: line, column: column };
}

/**
 * Represents a location in a Source.
 */

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(75);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(76);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
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
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
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
   * 2. The listener should not expect to see all state changes, as the state
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
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
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

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(81);


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateObject = _taggedTemplateLiteral(['{\n      loans(limit: 3, filters: {\n        sector: ', '\n      }) {\n        values { name, use, image { url(presetSize: loan_default) } }\n      }\n    }'], ['{\n      loans(limit: 3, filters: {\n        sector: ', '\n      }) {\n        values { name, use, image { url(presetSize: loan_default) } }\n      }\n    }']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Apollo = __webpack_require__(42);
var fetch = __webpack_require__(68); // eslint-disable-line no-unused-vars
var gql = __webpack_require__(58);

module.exports = function (w) {
  var enableEvents = typeof window !== 'undefined'; // only enable events if we are in the browser
  var initialRoute = w.location.pathname.replace(w.document.querySelector('base').getAttribute('href'), '').replace('/', '');
  var routes = [{ route: 'agriculture', title: 'Agriculture' }, { route: 'food', title: 'Food' }, { route: 'retail', title: 'Retail' }];
  var sectors = {
    'agriculture': 1,
    'food': 12,
    'retail': 7
  };

  var client = new Apollo.ApolloClient({
    networkInterface: Apollo.createNetworkInterface({
      uri: 'https://api.kivaws.org/graphql'
    })
  });

  // get loan data from the graphql endpoint
  var query = function query(sector) {
    return client.query({
      query: gql(_templateObject, sector)
    });
  };

  // attach dom event handlers after render
  var onRender = function onRender() {
    // navigate on the client when links are clicked
    w.document.querySelectorAll('a').forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();
        var route = event.target.getAttribute('href');
        w.history.pushState(route, 'view:' + route, route);
        render({ route: route, loans: [] });
        query(sectors[route]).then(function (result) {
          render({
            route: route,
            loans: result.data && result.data.loans && result.data.loans.values || []
          });
        });
      });
    });
  };

  // render to the dom using context ctx
  var render = function render(ctx) {
    var existingRoot = w.document.getElementById('root');
    var newRoot = w.document.createElement('div');
    newRoot.id = 'root';

    newRoot.innerHTML = '\n      ' + routes.reduce(function (html, _ref) {
      var route = _ref.route,
          title = _ref.title;
      return html + '\n        ' + (route === ctx.route ? '\n          <span>' + title + '</span>\n        ' : '\n          <a href="' + route + '">' + title + '</a>\n        ') + '\n      ';
    }, '') + '\n      <ul>\n      ' + ctx.loans.reduce(function (html, loan) {
      return html + '\n        <li>\n          <img src="' + loan.image.url + '" alt="Picture of ' + loan.name + '">\n          <h2>' + loan.name + '</h2>\n        </li>\n        ';
    }, '') + '\n      </ul>\n    ';

    if (existingRoot) {
      w.document.body.replaceChild(newRoot, existingRoot);
    } else {
      w.document.body.insertBefore(newRoot, w.document.body.firstChild);
    }

    if (enableEvents) {
      onRender();
    }
  };

  // attach browser navigation event handler
  if (enableEvents) {
    // update page if back/forward used
    w.addEventListener('popstate', function (event) {
      render({ route: event.state });
    });
  }

  // initial fetch/render
  return new Promise(function (resolve, reject) {
    if (sectors[initialRoute] === undefined) {
      render({
        route: initialRoute,
        loans: []
      });
      resolve();
    } else {
      query(sectors[initialRoute]).then(function (result) {
        render({
          route: initialRoute,
          loans: result.data && result.data.loans && result.data.loans.values || []
        });
        resolve();
      }).catch(function (err) {
        return reject(err);
      });
    }
  });
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport_networkInterface__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_fragmentMatcher__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_QueryManager__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_environment__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_storeUtils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_proxy__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__version__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__version___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__version__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};








var DEFAULT_REDUX_ROOT_KEY = 'apollo';
function defaultReduxRootSelector(state) {
    return state[DEFAULT_REDUX_ROOT_KEY];
}
function defaultDataIdFromObject(result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return result.__typename + ":" + result.id;
        }
        if (result._id !== undefined) {
            return result.__typename + ":" + result._id;
        }
    }
    return null;
}
var hasSuggestedDevtools = false;
var ApolloClient = (function () {
    function ApolloClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.middleware = function () {
            return function (store) {
                _this.setStore(store);
                return function (next) { return function (action) {
                    var previousApolloState = _this.queryManager.selectApolloState(store);
                    var returnValue = next(action);
                    var newApolloState = _this.queryManager.selectApolloState(store);
                    if (newApolloState !== previousApolloState) {
                        _this.queryManager.broadcastNewStore(store.getState());
                    }
                    if (_this.devToolsHookCb) {
                        _this.devToolsHookCb({
                            action: action,
                            state: _this.queryManager.getApolloState(),
                            dataWithOptimisticResults: _this.queryManager.getDataWithOptimisticResults(),
                        });
                    }
                    return returnValue;
                }; };
            };
        };
        var dataIdFromObject = options.dataIdFromObject;
        var networkInterface = options.networkInterface, reduxRootSelector = options.reduxRootSelector, initialState = options.initialState, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.addTypename, addTypename = _c === void 0 ? true : _c, customResolvers = options.customResolvers, connectToDevTools = options.connectToDevTools, fragmentMatcher = options.fragmentMatcher, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d;
        if (typeof reduxRootSelector === 'function') {
            this.reduxRootSelector = reduxRootSelector;
        }
        else if (typeof reduxRootSelector !== 'undefined') {
            throw new Error('"reduxRootSelector" must be a function.');
        }
        if (typeof fragmentMatcher === 'undefined') {
            this.fragmentMatcher = new __WEBPACK_IMPORTED_MODULE_1__data_fragmentMatcher__["b" /* HeuristicFragmentMatcher */]();
        }
        else {
            this.fragmentMatcher = fragmentMatcher;
        }
        this.initialState = initialState ? initialState : {};
        this.networkInterface = networkInterface ? networkInterface :
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__transport_networkInterface__["a" /* createNetworkInterface */])({ uri: '/graphql' });
        this.addTypename = addTypename;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.dataId = dataIdFromObject = dataIdFromObject || defaultDataIdFromObject;
        this.fieldWithArgs = __WEBPACK_IMPORTED_MODULE_5__data_storeUtils__["b" /* storeKeyNameFromFieldNameAndArgs */];
        this.queryDeduplication = queryDeduplication;
        if (ssrForceFetchDelay) {
            setTimeout(function () { return _this.disableNetworkFetches = false; }, ssrForceFetchDelay);
        }
        this.reducerConfig = {
            dataIdFromObject: dataIdFromObject,
            customResolvers: customResolvers,
            addTypename: addTypename,
            fragmentMatcher: this.fragmentMatcher.match,
        };
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.setStore = this.setStore.bind(this);
        this.resetStore = this.resetStore.bind(this);
        var defaultConnectToDevTools = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_environment__["a" /* isProduction */])() &&
            typeof window !== 'undefined' && (!window.__APOLLO_CLIENT__);
        if (typeof connectToDevTools === 'undefined' ? defaultConnectToDevTools : connectToDevTools) {
            window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_environment__["a" /* isProduction */])()) {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' && window.document && window.top === window.self) {
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    if (navigator.userAgent.indexOf('Chrome') > -1) {
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = __WEBPACK_IMPORTED_MODULE_7__version__["version"];
    }
    ApolloClient.prototype.watchQuery = function (options) {
        this.initStore();
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.watchQuery(options);
    };
    ApolloClient.prototype.query = function (options) {
        this.initStore();
        if (options.fetchPolicy === 'cache-and-network') {
            throw new Error('cache-and-network fetchPolicy can only be used with watchQuery');
        }
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.query(options);
    };
    ApolloClient.prototype.mutate = function (options) {
        this.initStore();
        return this.queryManager.mutate(options);
    };
    ApolloClient.prototype.subscribe = function (options) {
        this.initStore();
        return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient.prototype.readQuery = function (options) {
        return this.initProxy().readQuery(options);
    };
    ApolloClient.prototype.readFragment = function (options) {
        return this.initProxy().readFragment(options);
    };
    ApolloClient.prototype.writeQuery = function (options) {
        return this.initProxy().writeQuery(options);
    };
    ApolloClient.prototype.writeFragment = function (options) {
        return this.initProxy().writeFragment(options);
    };
    ApolloClient.prototype.reducer = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store__["b" /* createApolloReducer */])(this.reducerConfig);
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.initStore = function () {
        var _this = this;
        if (this.store) {
            return;
        }
        if (this.reduxRootSelector) {
            throw new Error('Cannot initialize the store because "reduxRootSelector" is provided. ' +
                'reduxRootSelector should only be used when the store is created outside of the client. ' +
                'This may lead to unexpected results when querying the store internally. ' +
                "Please remove that option from ApolloClient constructor.");
        }
        this.setStore(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* createApolloStore */])({
            reduxRootKey: DEFAULT_REDUX_ROOT_KEY,
            initialState: this.initialState,
            config: this.reducerConfig,
            logger: function (store) { return function (next) { return function (action) {
                var result = next(action);
                if (_this.devToolsHookCb) {
                    _this.devToolsHookCb({
                        action: action,
                        state: _this.queryManager.getApolloState(),
                        dataWithOptimisticResults: _this.queryManager.getDataWithOptimisticResults(),
                    });
                }
                return result;
            }; }; },
        }));
    };
    ApolloClient.prototype.resetStore = function () {
        if (this.queryManager) {
            this.queryManager.resetStore();
        }
    };
    ApolloClient.prototype.getInitialState = function () {
        this.initStore();
        return this.queryManager.getInitialState();
    };
    ApolloClient.prototype.setStore = function (store) {
        var reduxRootSelector;
        if (this.reduxRootSelector) {
            reduxRootSelector = this.reduxRootSelector;
        }
        else {
            reduxRootSelector = defaultReduxRootSelector;
        }
        if (typeof reduxRootSelector(store.getState()) === 'undefined') {
            throw new Error('Existing store does not use apolloReducer. Please make sure the store ' +
                'is properly configured and "reduxRootSelector" is correctly specified.');
        }
        this.store = store;
        this.queryManager = new __WEBPACK_IMPORTED_MODULE_3__core_QueryManager__["a" /* QueryManager */]({
            networkInterface: this.networkInterface,
            reduxRootSelector: reduxRootSelector,
            store: store,
            addTypename: this.addTypename,
            reducerConfig: this.reducerConfig,
            queryDeduplication: this.queryDeduplication,
            fragmentMatcher: this.fragmentMatcher,
        });
    };
    ApolloClient.prototype.initProxy = function () {
        if (!this.proxy) {
            this.initStore();
            this.proxy = new __WEBPACK_IMPORTED_MODULE_6__data_proxy__["a" /* ReduxDataProxy */](this.store, this.reduxRootSelector || defaultReduxRootSelector, this.fragmentMatcher, this.reducerConfig);
        }
        return this.proxy;
    };
    return ApolloClient;
}());
/* harmony default export */ __webpack_exports__["a"] = (ApolloClient);
//# sourceMappingURL=ApolloClient.js.map

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport_Deduplicator__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isEqual__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__queries_networkStatus__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__queries_queryTransform__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_resultReducers__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_fragmentMatcher__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_environment__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_maybeDeepFreeze__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_graphql_language_printer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_graphql_language_printer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__data_readFromStore__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__scheduler_scheduler__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__util_Observable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ObservableQuery__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryManager; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


















var QueryManager = (function () {
    function QueryManager(_a) {
        var networkInterface = _a.networkInterface, store = _a.store, reduxRootSelector = _a.reduxRootSelector, _b = _a.reducerConfig, reducerConfig = _b === void 0 ? { mutationBehaviorReducers: {} } : _b, fragmentMatcher = _a.fragmentMatcher, _c = _a.addTypename, addTypename = _c === void 0 ? true : _c, _d = _a.queryDeduplication, queryDeduplication = _d === void 0 ? false : _d;
        var _this = this;
        this.idCounter = 1;
        this.networkInterface = networkInterface;
        this.deduplicator = new __WEBPACK_IMPORTED_MODULE_0__transport_Deduplicator__["a" /* Deduplicator */](networkInterface);
        this.store = store;
        this.reduxRootSelector = reduxRootSelector;
        this.reducerConfig = reducerConfig;
        this.pollingTimers = {};
        this.queryListeners = {};
        this.queryDocuments = {};
        this.addTypename = addTypename;
        this.queryDeduplication = queryDeduplication;
        if (typeof fragmentMatcher === 'undefined') {
            this.fragmentMatcher = new __WEBPACK_IMPORTED_MODULE_8__data_fragmentMatcher__["b" /* HeuristicFragmentMatcher */]();
        }
        else {
            this.fragmentMatcher = fragmentMatcher;
        }
        this.scheduler = new __WEBPACK_IMPORTED_MODULE_13__scheduler_scheduler__["a" /* QueryScheduler */]({
            queryManager: this,
        });
        this.fetchQueryPromises = {};
        this.observableQueries = {};
        this.queryIdsByName = {};
        if (this.store['subscribe']) {
            var currentStoreData_1;
            this.store['subscribe'](function () {
                var previousStoreData = currentStoreData_1 || {};
                var previousStoreHasData = Object.keys(previousStoreData).length;
                currentStoreData_1 = _this.getApolloState();
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isEqual__["a" /* isEqual */])(previousStoreData, currentStoreData_1) && previousStoreHasData) {
                    return;
                }
                _this.broadcastQueries();
            });
        }
    }
    QueryManager.prototype.broadcastNewStore = function (store) {
        this.broadcastQueries();
    };
    QueryManager.prototype.mutate = function (_a) {
        var _this = this;
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, updateWithProxyFn = _a.update;
        var mutationId = this.generateQueryId();
        if (this.addTypename) {
            mutation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__queries_queryTransform__["a" /* addTypenameToDocument */])(mutation);
        }
        variables = Object.assign(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["e" /* getDefaultValues */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["h" /* getMutationDefinition */])(mutation)), variables);
        var mutationString = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11_graphql_language_printer__["print"])(mutation);
        var request = {
            query: mutation,
            variables: variables,
            operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(mutation),
        };
        this.queryDocuments[mutationId] = mutation;
        var updateQueries = {};
        if (updateQueriesByName) {
            Object.keys(updateQueriesByName).forEach(function (queryName) { return (_this.queryIdsByName[queryName] || []).forEach(function (queryId) {
                updateQueries[queryId] = updateQueriesByName[queryName];
            }); });
        }
        this.store.dispatch({
            type: 'APOLLO_MUTATION_INIT',
            mutationString: mutationString,
            mutation: mutation,
            variables: variables || {},
            operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(mutation),
            mutationId: mutationId,
            optimisticResponse: optimisticResponse,
            extraReducers: this.getExtraReducers(),
            updateQueries: updateQueries,
            update: updateWithProxyFn,
        });
        return new Promise(function (resolve, reject) {
            _this.networkInterface.query(request)
                .then(function (result) {
                if (result.errors) {
                    var error = new __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["a" /* ApolloError */]({
                        graphQLErrors: result.errors,
                    });
                    _this.store.dispatch({
                        type: 'APOLLO_MUTATION_ERROR',
                        error: error,
                        mutationId: mutationId,
                    });
                    delete _this.queryDocuments[mutationId];
                    reject(error);
                    return;
                }
                _this.store.dispatch({
                    type: 'APOLLO_MUTATION_RESULT',
                    result: result,
                    mutationId: mutationId,
                    document: mutation,
                    operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(mutation),
                    variables: variables || {},
                    extraReducers: _this.getExtraReducers(),
                    updateQueries: updateQueries,
                    update: updateWithProxyFn,
                });
                var reducerError = _this.getApolloState().reducerError;
                if (reducerError && reducerError.mutationId === mutationId) {
                    reject(reducerError.error);
                    return;
                }
                if (typeof refetchQueries[0] === 'string') {
                    refetchQueries.forEach(function (name) { _this.refetchQueryByName(name); });
                }
                else {
                    refetchQueries.forEach(function (pureQuery) {
                        _this.query({
                            query: pureQuery.query,
                            variables: pureQuery.variables,
                            fetchPolicy: 'network-only',
                        });
                    });
                }
                delete _this.queryDocuments[mutationId];
                resolve(result);
            })
                .catch(function (err) {
                _this.store.dispatch({
                    type: 'APOLLO_MUTATION_ERROR',
                    error: err,
                    mutationId: mutationId,
                });
                delete _this.queryDocuments[mutationId];
                reject(new __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["a" /* ApolloError */]({
                    networkError: err,
                }));
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
        var _this = this;
        var _a = options.variables, variables = _a === void 0 ? {} : _a, _b = options.metadata, metadata = _b === void 0 ? null : _b, _c = options.fetchPolicy, fetchPolicy = _c === void 0 ? 'cache-first' : _c;
        var queryDoc = this.transformQueryDocument(options).queryDoc;
        var queryString = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11_graphql_language_printer__["print"])(queryDoc);
        var storeResult;
        var needToFetch = fetchPolicy === 'network-only';
        if ((fetchType !== __WEBPACK_IMPORTED_MODULE_2__types__["a" /* FetchType */].refetch && fetchPolicy !== 'network-only')) {
            var _d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__data_readFromStore__["b" /* diffQueryAgainstStore */])({
                query: queryDoc,
                store: this.reduxRootSelector(this.store.getState()).data,
                variables: variables,
                returnPartialData: true,
                fragmentMatcherFunction: this.fragmentMatcher.match,
                config: this.reducerConfig,
            }), isMissing = _d.isMissing, result = _d.result;
            needToFetch = isMissing || fetchPolicy === 'cache-and-network';
            storeResult = result;
        }
        var shouldFetch = needToFetch && fetchPolicy !== 'cache-only';
        var requestId = this.generateRequestId();
        this.queryDocuments[queryId] = queryDoc;
        this.store.dispatch({
            type: 'APOLLO_QUERY_INIT',
            queryString: queryString,
            document: queryDoc,
            variables: variables,
            fetchPolicy: fetchPolicy,
            queryId: queryId,
            requestId: requestId,
            storePreviousVariables: shouldFetch,
            isPoll: fetchType === __WEBPACK_IMPORTED_MODULE_2__types__["a" /* FetchType */].poll,
            isRefetch: fetchType === __WEBPACK_IMPORTED_MODULE_2__types__["a" /* FetchType */].refetch,
            fetchMoreForQueryId: fetchMoreForQueryId,
            metadata: metadata,
        });
        var shouldDispatchClientResult = !shouldFetch || fetchPolicy === 'cache-and-network';
        if (shouldDispatchClientResult) {
            this.store.dispatch({
                type: 'APOLLO_QUERY_RESULT_CLIENT',
                result: { data: storeResult },
                variables: variables,
                document: queryDoc,
                complete: !shouldFetch,
                queryId: queryId,
                requestId: requestId,
            });
        }
        if (shouldFetch) {
            var networkResult = this.fetchRequest({
                requestId: requestId,
                queryId: queryId,
                document: queryDoc,
                options: options,
                fetchMoreForQueryId: fetchMoreForQueryId,
            }).catch(function (error) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["b" /* isApolloError */])(error)) {
                    throw error;
                }
                else {
                    _this.store.dispatch({
                        type: 'APOLLO_QUERY_ERROR',
                        error: error,
                        queryId: queryId,
                        requestId: requestId,
                        fetchMoreForQueryId: fetchMoreForQueryId,
                    });
                    _this.removeFetchQueryPromise(requestId);
                    throw new __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["a" /* ApolloError */]({
                        networkError: error,
                    });
                }
            });
            if (fetchPolicy !== 'cache-and-network') {
                return networkResult;
            }
        }
        return Promise.resolve({ data: storeResult });
    };
    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
        var _this = this;
        var lastResult;
        var previouslyHadError = false;
        return function (queryStoreValue) {
            if (!queryStoreValue) {
                return;
            }
            var storedQuery = _this.observableQueries[queryId];
            var fetchPolicy = storedQuery ? storedQuery.observableQuery.options.fetchPolicy : options.fetchPolicy;
            var shouldNotifyIfLoading = queryStoreValue.previousVariables ||
                fetchPolicy === 'cache-only' || fetchPolicy === 'cache-and-network';
            var networkStatusChanged = lastResult && queryStoreValue.networkStatus !== lastResult.networkStatus;
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__queries_networkStatus__["b" /* isNetworkRequestInFlight */])(queryStoreValue.networkStatus) ||
                (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                shouldNotifyIfLoading) {
                if ((queryStoreValue.graphQLErrors && queryStoreValue.graphQLErrors.length > 0) ||
                    queryStoreValue.networkError) {
                    var apolloError_1 = new __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["a" /* ApolloError */]({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    });
                    previouslyHadError = true;
                    if (observer.error) {
                        try {
                            observer.error(apolloError_1);
                        }
                        catch (e) {
                            setTimeout(function () { throw e; }, 0);
                        }
                    }
                    else {
                        setTimeout(function () { throw apolloError_1; }, 0);
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util_environment__["a" /* isProduction */])()) {
                            console.info('An unhandled error was thrown because no error handler is registered ' +
                                'for the query ' + queryStoreValue.queryString);
                        }
                    }
                }
                else {
                    try {
                        var _a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__data_readFromStore__["b" /* diffQueryAgainstStore */])({
                            store: _this.getDataWithOptimisticResults(),
                            query: _this.queryDocuments[queryId],
                            variables: queryStoreValue.previousVariables || queryStoreValue.variables,
                            config: _this.reducerConfig,
                            fragmentMatcherFunction: _this.fragmentMatcher.match,
                            previousResult: lastResult && lastResult.data,
                        }), data = _a.result, isMissing = _a.isMissing;
                        var resultFromStore = void 0;
                        if (isMissing && fetchPolicy !== 'cache-only') {
                            resultFromStore = {
                                data: lastResult && lastResult.data,
                                loading: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__queries_networkStatus__["b" /* isNetworkRequestInFlight */])(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: true,
                            };
                        }
                        else {
                            resultFromStore = {
                                data: data,
                                loading: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__queries_networkStatus__["b" /* isNetworkRequestInFlight */])(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: false,
                            };
                        }
                        if (observer.next) {
                            var isDifferentResult = !(lastResult &&
                                resultFromStore &&
                                lastResult.networkStatus === resultFromStore.networkStatus &&
                                lastResult.stale === resultFromStore.stale &&
                                lastResult.data === resultFromStore.data);
                            if (isDifferentResult || previouslyHadError) {
                                lastResult = resultFromStore;
                                try {
                                    observer.next(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util_maybeDeepFreeze__["a" /* default */])(resultFromStore));
                                }
                                catch (e) {
                                    setTimeout(function () { throw e; }, 0);
                                }
                            }
                        }
                        previouslyHadError = false;
                    }
                    catch (error) {
                        previouslyHadError = true;
                        if (observer.error) {
                            observer.error(new __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["a" /* ApolloError */]({
                                networkError: error,
                            }));
                        }
                        return;
                    }
                }
            }
        };
    };
    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
        if (shouldSubscribe === void 0) { shouldSubscribe = true; }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option is no longer supported since Apollo Client 1.0.');
        }
        if (options.forceFetch) {
            throw new Error('forceFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.noFetch) {
            throw new Error('noFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        var queryDefinition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["b" /* getQueryDefinition */])(options.query);
        if (queryDefinition.variableDefinitions && queryDefinition.variableDefinitions.length) {
            var defaultValues = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["e" /* getDefaultValues */])(queryDefinition);
            options.variables = Object.assign(defaultValues, options.variables);
        }
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var transformedOptions = __assign({}, options);
        var observableQuery = new __WEBPACK_IMPORTED_MODULE_16__ObservableQuery__["a" /* ObservableQuery */]({
            scheduler: this.scheduler,
            options: transformedOptions,
            shouldSubscribe: shouldSubscribe,
        });
        return observableQuery;
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
        if (!options.query) {
            throw new Error('query option is required. You must specify your GraphQL document in the query option.');
        }
        if (options.query.kind !== 'Document') {
            throw new Error('You must wrap the query string in a "gql" tag.');
        }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option only supported on watchQuery.');
        }
        if (options.pollInterval) {
            throw new Error('pollInterval option only supported on watchQuery.');
        }
        if (options.forceFetch) {
            throw new Error('forceFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.noFetch) {
            throw new Error('noFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (typeof options.notifyOnNetworkStatusChange !== 'undefined') {
            throw new Error('Cannot call "query" with "notifyOnNetworkStatusChange" option. Only "watchQuery" has that option.');
        }
        options.notifyOnNetworkStatusChange = false;
        var requestId = this.idCounter;
        var resPromise = new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resPromise, resolve, reject);
            return _this.watchQuery(options, false).result().then(function (result) {
                _this.removeFetchQueryPromise(requestId);
                resolve(result);
            }).catch(function (error) {
                _this.removeFetchQueryPromise(requestId);
                reject(error);
            });
        });
        return resPromise;
    };
    QueryManager.prototype.generateQueryId = function () {
        var queryId = this.idCounter.toString();
        this.idCounter++;
        return queryId;
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.store.dispatch({
            type: 'APOLLO_QUERY_STOP',
            queryId: queryId,
        });
    };
    QueryManager.prototype.getApolloState = function () {
        return this.reduxRootSelector(this.store.getState());
    };
    QueryManager.prototype.selectApolloState = function (store) {
        return this.reduxRootSelector(store.getState());
    };
    QueryManager.prototype.getInitialState = function () {
        return { data: this.getApolloState().data };
    };
    QueryManager.prototype.getDataWithOptimisticResults = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__store__["c" /* getDataWithOptimisticResults */])(this.getApolloState());
    };
    QueryManager.prototype.addQueryListener = function (queryId, listener) {
        this.queryListeners[queryId] = this.queryListeners[queryId] || [];
        this.queryListeners[queryId].push(listener);
    };
    QueryManager.prototype.addFetchQueryPromise = function (requestId, promise, resolve, reject) {
        this.fetchQueryPromises[requestId.toString()] = { promise: promise, resolve: resolve, reject: reject };
    };
    QueryManager.prototype.removeFetchQueryPromise = function (requestId) {
        delete this.fetchQueryPromises[requestId.toString()];
    };
    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
        this.observableQueries[queryId] = { observableQuery: observableQuery };
        var queryDef = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["b" /* getQueryDefinition */])(observableQuery.options.query);
        if (queryDef.name && queryDef.name.value) {
            var queryName = queryDef.name.value;
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName] || [];
            this.queryIdsByName[queryName].push(observableQuery.queryId);
        }
    };
    QueryManager.prototype.removeObservableQuery = function (queryId) {
        var observableQuery = this.observableQueries[queryId].observableQuery;
        var definition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["b" /* getQueryDefinition */])(observableQuery.options.query);
        var queryName = definition.name ? definition.name.value : null;
        delete this.observableQueries[queryId];
        if (queryName) {
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName].filter(function (val) {
                return !(observableQuery.queryId === val);
            });
        }
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        Object.keys(this.fetchQueryPromises).forEach(function (key) {
            var reject = _this.fetchQueryPromises[key].reject;
            reject(new Error('Store reset while query was in flight.'));
        });
        this.store.dispatch({
            type: 'APOLLO_STORE_RESET',
            observableQueryIds: Object.keys(this.observableQueries),
        });
        Object.keys(this.observableQueries).forEach(function (queryId) {
            var storeQuery = _this.reduxRootSelector(_this.store.getState()).queries[queryId];
            var fetchPolicy = _this.observableQueries[queryId].observableQuery.options.fetchPolicy;
            if (fetchPolicy !== 'cache-only') {
                _this.observableQueries[queryId].observableQuery.refetch();
            }
        });
    };
    QueryManager.prototype.startQuery = function (queryId, options, listener) {
        this.addQueryListener(queryId, listener);
        this.fetchQuery(queryId, options)
            .catch(function (error) { return undefined; });
        return queryId;
    };
    QueryManager.prototype.startGraphQLSubscription = function (options) {
        var _this = this;
        var query = options.query;
        var transformedDoc = query;
        if (this.addTypename) {
            transformedDoc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__queries_queryTransform__["a" /* addTypenameToDocument */])(transformedDoc);
        }
        var variables = Object.assign(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["e" /* getDefaultValues */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["f" /* getOperationDefinition */])(query)), options.variables);
        var request = {
            query: transformedDoc,
            variables: variables,
            operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(transformedDoc),
        };
        var subId;
        var observers = [];
        return new __WEBPACK_IMPORTED_MODULE_14__util_Observable__["a" /* Observable */](function (observer) {
            observers.push(observer);
            if (observers.length === 1) {
                var handler = function (error, result) {
                    if (error) {
                        observers.forEach(function (obs) {
                            if (obs.error) {
                                obs.error(error);
                            }
                        });
                    }
                    else {
                        _this.store.dispatch({
                            type: 'APOLLO_SUBSCRIPTION_RESULT',
                            document: transformedDoc,
                            operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(transformedDoc),
                            result: { data: result },
                            variables: variables,
                            subscriptionId: subId,
                            extraReducers: _this.getExtraReducers(),
                        });
                        observers.forEach(function (obs) {
                            if (obs.next) {
                                obs.next(result);
                            }
                        });
                    }
                };
                subId = _this.networkInterface.subscribe(request, handler);
            }
            return {
                unsubscribe: function () {
                    observers = observers.filter(function (obs) { return obs !== observer; });
                    if (observers.length === 0) {
                        _this.networkInterface.unsubscribe(subId);
                    }
                },
                _networkSubscriptionId: subId,
            };
        });
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        delete this.queryListeners[queryId];
        delete this.queryDocuments[queryId];
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.removeQuery(queryId);
        this.stopQueryInStore(queryId);
    };
    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, isOptimistic) {
        if (isOptimistic === void 0) { isOptimistic = false; }
        var _a = this.getQueryParts(observableQuery), variables = _a.variables, document = _a.document;
        var lastResult = observableQuery.getLastResult();
        var queryOptions = observableQuery.options;
        var readOptions = {
            store: isOptimistic ? this.getDataWithOptimisticResults() : this.getApolloState().data,
            query: document,
            variables: variables,
            config: this.reducerConfig,
            previousResult: lastResult ? lastResult.data : undefined,
            fragmentMatcherFunction: this.fragmentMatcher.match,
        };
        try {
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__data_readFromStore__["a" /* readQueryFromStore */])(readOptions);
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util_maybeDeepFreeze__["a" /* default */])({ data: data, partial: false });
        }
        catch (e) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__util_maybeDeepFreeze__["a" /* default */])({ data: {}, partial: true });
        }
    };
    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable, isOptimistic) {
        if (isOptimistic === void 0) { isOptimistic = false; }
        var observableQuery;
        if (typeof queryIdOrObservable === 'string') {
            if (!this.observableQueries[queryIdOrObservable]) {
                throw new Error("ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
            }
            observableQuery = this.observableQueries[queryIdOrObservable].observableQuery;
        }
        else {
            observableQuery = queryIdOrObservable;
        }
        var _a = this.getQueryParts(observableQuery), variables = _a.variables, document = _a.document;
        var data = this.getCurrentQueryResult(observableQuery, isOptimistic).data;
        return {
            previousResult: data,
            variables: variables,
            document: document,
        };
    };
    QueryManager.prototype.getQueryParts = function (observableQuery) {
        var queryOptions = observableQuery.options;
        var transformedDoc = observableQuery.options.query;
        if (this.addTypename) {
            transformedDoc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__queries_queryTransform__["a" /* addTypenameToDocument */])(transformedDoc);
        }
        return {
            variables: queryOptions.variables,
            document: transformedDoc,
        };
    };
    QueryManager.prototype.transformQueryDocument = function (options) {
        var queryDoc = options.query;
        if (this.addTypename) {
            queryDoc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__queries_queryTransform__["a" /* addTypenameToDocument */])(queryDoc);
        }
        return {
            queryDoc: queryDoc,
        };
    };
    QueryManager.prototype.getExtraReducers = function () {
        var _this = this;
        return Object.keys(this.observableQueries).map(function (obsQueryId) {
            var query = _this.observableQueries[obsQueryId].observableQuery;
            var queryOptions = query.options;
            if (queryOptions.reducer) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__data_resultReducers__["a" /* createStoreReducer */])(queryOptions.reducer, _this.addTypename ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__queries_queryTransform__["a" /* addTypenameToDocument */])(queryOptions.query) : queryOptions.query, query.variables || {}, _this.reducerConfig);
            }
            return null;
        }).filter(function (reducer) { return reducer !== null; });
    };
    QueryManager.prototype.fetchRequest = function (_a) {
        var _this = this;
        var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
        var variables = options.variables;
        var request = {
            query: document,
            variables: variables,
            operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(document),
        };
        var retPromise = new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, retPromise, resolve, reject);
            _this.deduplicator.query(request, _this.queryDeduplication)
                .then(function (result) {
                var extraReducers = _this.getExtraReducers();
                _this.store.dispatch({
                    type: 'APOLLO_QUERY_RESULT',
                    document: document,
                    operationName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__queries_getFromAST__["g" /* getOperationName */])(document),
                    result: result,
                    queryId: queryId,
                    requestId: requestId,
                    fetchMoreForQueryId: fetchMoreForQueryId,
                    extraReducers: extraReducers,
                });
                _this.removeFetchQueryPromise(requestId);
                if (result.errors) {
                    throw new __WEBPACK_IMPORTED_MODULE_15__errors_ApolloError__["a" /* ApolloError */]({
                        graphQLErrors: result.errors,
                    });
                }
                return result;
            }).then(function () {
                var resultFromStore;
                try {
                    resultFromStore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__data_readFromStore__["a" /* readQueryFromStore */])({
                        store: _this.getApolloState().data,
                        variables: variables,
                        query: document,
                        config: _this.reducerConfig,
                        fragmentMatcherFunction: _this.fragmentMatcher.match,
                    });
                }
                catch (e) { }
                var reducerError = _this.getApolloState().reducerError;
                if (reducerError && reducerError.queryId === queryId) {
                    return Promise.reject(reducerError.error);
                }
                _this.removeFetchQueryPromise(requestId);
                resolve({ data: resultFromStore, loading: false, networkStatus: __WEBPACK_IMPORTED_MODULE_3__queries_networkStatus__["a" /* NetworkStatus */].ready, stale: false });
                return Promise.resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
        return retPromise;
    };
    QueryManager.prototype.refetchQueryByName = function (queryName) {
        var _this = this;
        var refetchedQueries = this.queryIdsByName[queryName];
        if (refetchedQueries === undefined) {
            console.warn("Warning: unknown query with name " + queryName + " asked to refetch");
            return;
        }
        else {
            return Promise.all(refetchedQueries.map(function (queryId) { return _this.observableQueries[queryId].observableQuery.refetch(); }));
        }
    };
    QueryManager.prototype.broadcastQueries = function () {
        var _this = this;
        var queries = this.getApolloState().queries;
        Object.keys(this.queryListeners).forEach(function (queryId) {
            var listeners = _this.queryListeners[queryId];
            if (listeners) {
                listeners.forEach(function (listener) {
                    if (listener) {
                        var queryStoreValue = queries[queryId];
                        listener(queryStoreValue);
                    }
                });
            }
        });
    };
    QueryManager.prototype.generateRequestId = function () {
        var requestId = this.idCounter;
        this.idCounter++;
        return requestId;
    };
    return QueryManager;
}());

//# sourceMappingURL=QueryManager.js.map

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__writeToStore__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = replaceQueryResults;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function replaceQueryResults(state, _a, config) {
    var variables = _a.variables, document = _a.document, newResult = _a.newResult;
    var clonedState = __assign({}, state);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__writeToStore__["b" /* writeResultToStore */])({
        result: newResult,
        dataId: 'ROOT_QUERY',
        variables: variables,
        document: document,
        store: clonedState,
        dataIdFromObject: config.dataIdFromObject,
    });
}
//# sourceMappingURL=replaceQueryResults.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__readFromStore__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__writeToStore__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = createStoreReducer;


function createStoreReducer(resultReducer, document, variables, config) {
    return function (store, action) {
        var _a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__readFromStore__["b" /* diffQueryAgainstStore */])({
            store: store,
            query: document,
            variables: variables,
            returnPartialData: true,
            fragmentMatcherFunction: config.fragmentMatcher,
            config: config,
        }), result = _a.result, isMissing = _a.isMissing;
        if (isMissing) {
            return store;
        }
        var nextResult;
        try {
            nextResult = resultReducer(result, action, variables);
        }
        catch (err) {
            console.warn('Unhandled error in result reducer', err);
            throw err;
        }
        if (result !== nextResult) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__writeToStore__["b" /* writeResultToStore */])({
                dataId: 'ROOT_QUERY',
                result: nextResult,
                store: store,
                document: document,
                variables: variables,
                dataIdFromObject: config.dataIdFromObject,
            });
        }
        return store;
    };
}
//# sourceMappingURL=resultReducers.js.map

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport_networkInterface__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transport_batchedNetworkInterface__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_ObservableQuery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_readFromStore__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_writeToStore__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__queries_getFromAST__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__queries_networkStatus__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__queries_queryTransform__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__errors_ApolloError__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ApolloClient__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__data_storeUtils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__data_fragmentMatcher__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createNetworkInterface", function() { return __WEBPACK_IMPORTED_MODULE_0__transport_networkInterface__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createBatchingNetworkInterface", function() { return __WEBPACK_IMPORTED_MODULE_1__transport_batchedNetworkInterface__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createApolloStore", function() { return __WEBPACK_IMPORTED_MODULE_3__store__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createApolloReducer", function() { return __WEBPACK_IMPORTED_MODULE_3__store__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "readQueryFromStore", function() { return __WEBPACK_IMPORTED_MODULE_5__data_readFromStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "writeQueryToStore", function() { return __WEBPACK_IMPORTED_MODULE_6__data_writeToStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "addTypenameToDocument", function() { return __WEBPACK_IMPORTED_MODULE_9__queries_queryTransform__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFragmentMap", function() { return __WEBPACK_IMPORTED_MODULE_7__queries_getFromAST__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkStatus", function() { return __WEBPACK_IMPORTED_MODULE_8__queries_networkStatus__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloError", function() { return __WEBPACK_IMPORTED_MODULE_10__errors_ApolloError__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryDefinition", function() { return __WEBPACK_IMPORTED_MODULE_7__queries_getFromAST__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentDefinitions", function() { return __WEBPACK_IMPORTED_MODULE_7__queries_getFromAST__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toIdValue", function() { return __WEBPACK_IMPORTED_MODULE_12__data_storeUtils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IntrospectionFragmentMatcher", function() { return __WEBPACK_IMPORTED_MODULE_13__data_fragmentMatcher__["a"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__, "print")) __webpack_require__.d(__webpack_exports__, "printAST", function() { return __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__["print"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPFetchNetworkInterface", function() { return __WEBPACK_IMPORTED_MODULE_0__transport_networkInterface__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPBatchedNetworkInterface", function() { return __WEBPACK_IMPORTED_MODULE_1__transport_batchedNetworkInterface__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableQuery", function() { return __WEBPACK_IMPORTED_MODULE_4__core_ObservableQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloClient", function() { return __WEBPACK_IMPORTED_MODULE_11__ApolloClient__["a"]; });















/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_11__ApolloClient__["a" /* default */]);
//# sourceMappingURL=index.js.map

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = mutations;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function mutations(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["a" /* isMutationInitAction */])(action)) {
        var newState = __assign({}, previousState);
        newState[action.mutationId] = {
            mutationString: action.mutationString,
            variables: action.variables,
            loading: true,
            error: null,
        };
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["c" /* isMutationResultAction */])(action)) {
        var newState = __assign({}, previousState);
        newState[action.mutationId] = __assign({}, previousState[action.mutationId], { loading: false, error: null });
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["b" /* isMutationErrorAction */])(action)) {
        var newState = __assign({}, previousState);
        newState[action.mutationId] = __assign({}, previousState[action.mutationId], { loading: false, error: action.error });
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["g" /* isStoreResetAction */])(action)) {
        return {};
    }
    return previousState;
}
//# sourceMappingURL=store.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shouldInclude;
function shouldInclude(selection, variables) {
    if (variables === void 0) { variables = {}; }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            return;
        }
        var directiveArguments = directive.arguments || [];
        var directiveName = directive.name.value;
        if (directiveArguments.length !== 1) {
            throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
        }
        var ifArgument = directiveArguments[0];
        if (!ifArgument.name || ifArgument.name.value !== 'if') {
            throw new Error("Invalid argument for the @" + directiveName + " directive.");
        }
        var ifValue = directiveArguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            if (ifValue.kind !== 'Variable') {
                throw new Error("Argument for the @" + directiveName + " directive must be a variable or a bool ean value.");
            }
            else {
                evaledValue = variables[ifValue.name.value];
                if (evaledValue === undefined) {
                    throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                }
            }
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}
//# sourceMappingURL=directives.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_storeUtils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isEqual__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__networkStatus__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = queries;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




function queries(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["i" /* isQueryInitAction */])(action)) {
        var newState = __assign({}, previousState);
        var previousQuery = previousState[action.queryId];
        if (previousQuery && previousQuery.queryString !== action.queryString) {
            throw new Error('Internal Error: may not update existing query string in store');
        }
        var isSetVariables = false;
        var previousVariables = null;
        if (action.storePreviousVariables &&
            previousQuery &&
            previousQuery.networkStatus !== __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].loading) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isEqual__["a" /* isEqual */])(previousQuery.variables, action.variables)) {
                isSetVariables = true;
                previousVariables = previousQuery.variables;
            }
        }
        var newNetworkStatus = __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].loading;
        if (isSetVariables) {
            newNetworkStatus = __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].setVariables;
        }
        else if (action.isPoll) {
            newNetworkStatus = __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].poll;
        }
        else if (action.isRefetch) {
            newNetworkStatus = __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].refetch;
        }
        else if (action.isPoll) {
            newNetworkStatus = __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].poll;
        }
        newState[action.queryId] = {
            queryString: action.queryString,
            document: action.document,
            variables: action.variables,
            previousVariables: previousVariables,
            networkError: null,
            graphQLErrors: [],
            networkStatus: newNetworkStatus,
            lastRequestId: action.requestId,
            metadata: action.metadata,
        };
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = __assign({}, previousState[action.fetchMoreForQueryId], { networkStatus: __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].fetchMore });
        }
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["d" /* isQueryResultAction */])(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        if (action.requestId < previousState[action.queryId].lastRequestId) {
            return previousState;
        }
        var newState = __assign({}, previousState);
        var resultHasGraphQLErrors = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__data_storeUtils__["i" /* graphQLResultHasError */])(action.result);
        newState[action.queryId] = __assign({}, previousState[action.queryId], { networkError: null, graphQLErrors: resultHasGraphQLErrors ? action.result.errors : [], previousVariables: null, networkStatus: __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].ready });
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = __assign({}, previousState[action.fetchMoreForQueryId], { networkStatus: __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].ready });
        }
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["j" /* isQueryErrorAction */])(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        if (action.requestId < previousState[action.queryId].lastRequestId) {
            return previousState;
        }
        var newState = __assign({}, previousState);
        newState[action.queryId] = __assign({}, previousState[action.queryId], { networkError: action.error, networkStatus: __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].error });
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = __assign({}, previousState[action.fetchMoreForQueryId], { networkError: action.error, networkStatus: __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].error });
        }
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["k" /* isQueryResultClientAction */])(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        var newState = __assign({}, previousState);
        newState[action.queryId] = __assign({}, previousState[action.queryId], { networkError: null, previousVariables: null, networkStatus: action.complete ? __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].ready : __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].loading });
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["l" /* isQueryStopAction */])(action)) {
        var newState = __assign({}, previousState);
        delete newState[action.queryId];
        return newState;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions__["g" /* isStoreResetAction */])(action)) {
        return resetQueryState(previousState, action);
    }
    return previousState;
}
function resetQueryState(state, action) {
    var observableQueryIds = action.observableQueryIds;
    var newQueries = Object.keys(state).filter(function (queryId) {
        return (observableQueryIds.indexOf(queryId) > -1);
    }).reduce(function (res, key) {
        res[key] = __assign({}, state[key], { networkStatus: __WEBPACK_IMPORTED_MODULE_3__networkStatus__["a" /* NetworkStatus */].loading });
        return res;
    }, {});
    return newQueries;
}
//# sourceMappingURL=store.js.map

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_types__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_ObservableQuery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_networkStatus__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryScheduler; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var QueryScheduler = (function () {
    function QueryScheduler(_a) {
        var queryManager = _a.queryManager;
        this.queryManager = queryManager;
        this.pollingTimers = {};
        this.inFlightQueries = {};
        this.registeredQueries = {};
        this.intervalQueries = {};
    }
    QueryScheduler.prototype.checkInFlight = function (queryId) {
        var queries = this.queryManager.getApolloState().queries;
        return queries[queryId] && queries[queryId].networkStatus !== __WEBPACK_IMPORTED_MODULE_2__queries_networkStatus__["a" /* NetworkStatus */].ready;
    };
    QueryScheduler.prototype.fetchQuery = function (queryId, options, fetchType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryManager.fetchQuery(queryId, options, fetchType).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    QueryScheduler.prototype.startPollingQuery = function (options, queryId, listener) {
        if (!options.pollInterval) {
            throw new Error('Attempted to start a polling query without a polling interval.');
        }
        this.registeredQueries[queryId] = options;
        if (listener) {
            this.queryManager.addQueryListener(queryId, listener);
        }
        this.addQueryOnInterval(queryId, options);
        return queryId;
    };
    QueryScheduler.prototype.stopPollingQuery = function (queryId) {
        delete this.registeredQueries[queryId];
    };
    QueryScheduler.prototype.fetchQueriesOnInterval = function (interval) {
        var _this = this;
        this.intervalQueries[interval] = this.intervalQueries[interval].filter(function (queryId) {
            if (!_this.registeredQueries.hasOwnProperty(queryId)) {
                return false;
            }
            if (_this.checkInFlight(queryId)) {
                return true;
            }
            var queryOptions = _this.registeredQueries[queryId];
            var pollingOptions = __assign({}, queryOptions);
            pollingOptions.fetchPolicy = 'network-only';
            _this.fetchQuery(queryId, pollingOptions, __WEBPACK_IMPORTED_MODULE_0__core_types__["a" /* FetchType */].poll);
            return true;
        });
        if (this.intervalQueries[interval].length === 0) {
            clearInterval(this.pollingTimers[interval]);
            delete this.intervalQueries[interval];
        }
    };
    QueryScheduler.prototype.addQueryOnInterval = function (queryId, queryOptions) {
        var _this = this;
        var interval = queryOptions.pollInterval;
        if (!interval) {
            throw new Error("A poll interval is required to start polling query with id '" + queryId + "'.");
        }
        if (this.intervalQueries.hasOwnProperty(interval.toString()) && this.intervalQueries[interval].length > 0) {
            this.intervalQueries[interval].push(queryId);
        }
        else {
            this.intervalQueries[interval] = [queryId];
            this.pollingTimers[interval] = setInterval(function () {
                _this.fetchQueriesOnInterval(interval);
            }, interval);
        }
    };
    QueryScheduler.prototype.registerPollingQuery = function (queryOptions) {
        if (!queryOptions.pollInterval) {
            throw new Error('Attempted to register a non-polling query with the scheduler.');
        }
        return new __WEBPACK_IMPORTED_MODULE_1__core_ObservableQuery__["a" /* ObservableQuery */]({
            scheduler: this,
            options: queryOptions,
        });
    };
    return QueryScheduler;
}());

//# sourceMappingURL=scheduler.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Deduplicator; });

var Deduplicator = (function () {
    function Deduplicator(networkInterface) {
        this.networkInterface = networkInterface;
        this.inFlightRequestPromises = {};
    }
    Deduplicator.prototype.query = function (request, deduplicate) {
        var _this = this;
        if (deduplicate === void 0) { deduplicate = true; }
        if (!deduplicate) {
            return this.networkInterface.query(request);
        }
        var key = this.getKey(request);
        if (!this.inFlightRequestPromises[key]) {
            this.inFlightRequestPromises[key] = this.networkInterface.query(request);
        }
        return this.inFlightRequestPromises[key]
            .then(function (res) {
            delete _this.inFlightRequestPromises[key];
            return res;
        })
            .catch(function (err) {
            delete _this.inFlightRequestPromises[key];
            throw err;
        });
    };
    Deduplicator.prototype.getKey = function (request) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"])(request.query) + "|" + JSON.stringify(request.variables) + "|" + request.operationName;
    };
    return Deduplicator;
}());

//# sourceMappingURL=Deduplicator.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__networkInterface__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__batching__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_assign__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HTTPBatchedNetworkInterface; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createBatchingNetworkInterface;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




var HTTPBatchedNetworkInterface = (function (_super) {
    __extends(HTTPBatchedNetworkInterface, _super);
    function HTTPBatchedNetworkInterface(uri, batchInterval, fetchOpts) {
        var _this = _super.call(this, uri, fetchOpts) || this;
        if (typeof batchInterval !== 'number') {
            throw new Error("batchInterval must be a number, got " + batchInterval);
        }
        _this.batcher = new __WEBPACK_IMPORTED_MODULE_2__batching__["a" /* QueryBatcher */]({
            batchInterval: batchInterval,
            batchFetchFunction: _this.batchQuery.bind(_this),
        });
        return _this;
    }
    HTTPBatchedNetworkInterface.prototype.query = function (request) {
        return this.batcher.enqueueRequest(request);
    };
    HTTPBatchedNetworkInterface.prototype.batchQuery = function (requests) {
        var _this = this;
        var options = __assign({}, this._opts);
        var middlewarePromise = this.applyBatchMiddlewares({
            requests: requests,
            options: options,
        });
        return new Promise(function (resolve, reject) {
            middlewarePromise.then(function (batchRequestAndOptions) {
                return _this.batchedFetchFromRemoteEndpoint(batchRequestAndOptions)
                    .then(function (result) {
                    var httpResponse = result;
                    if (!httpResponse.ok) {
                        return _this.applyBatchAfterwares({ responses: [httpResponse], options: batchRequestAndOptions })
                            .then(function () {
                            var httpError = new Error("Network request failed with status " + httpResponse.status + " - \"" + httpResponse.statusText + "\"");
                            httpError.response = httpResponse;
                            throw httpError;
                        });
                    }
                    return result.json();
                })
                    .then(function (responses) {
                    if (typeof responses.map !== 'function') {
                        throw new Error('BatchingNetworkInterface: server response is not an array');
                    }
                    _this.applyBatchAfterwares({
                        responses: responses,
                        options: batchRequestAndOptions.options,
                    }).then(function (responseAndOptions) {
                        resolve(responseAndOptions.responses);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    HTTPBatchedNetworkInterface.prototype.applyBatchMiddlewares = function (_a) {
        var _this = this;
        var requests = _a.requests, options = _a.options;
        return new Promise(function (resolve, reject) {
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyBatchMiddleware.apply(scope, [{ requests: requests, options: options }, next]);
                        }
                    }
                    else {
                        resolve({
                            requests: requests,
                            options: options,
                        });
                    }
                };
                next();
            };
            queue(_this._middlewares.slice(), _this);
        });
    };
    HTTPBatchedNetworkInterface.prototype.applyBatchAfterwares = function (_a) {
        var _this = this;
        var responses = _a.responses, options = _a.options;
        return new Promise(function (resolve, reject) {
            var responseObject = { responses: responses, options: options };
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyBatchAfterware.apply(scope, [responseObject, next]);
                        }
                    }
                    else {
                        resolve(responseObject);
                    }
                };
                next();
            };
            queue(_this._afterwares.slice(), _this);
        });
    };
    HTTPBatchedNetworkInterface.prototype.use = function (middlewares) {
        var _this = this;
        middlewares.map(function (middleware) {
            if (typeof middleware.applyBatchMiddleware === 'function') {
                _this._middlewares.push(middleware);
            }
            else {
                throw new Error('Batch middleware must implement the applyBatchMiddleware function');
            }
        });
        return this;
    };
    HTTPBatchedNetworkInterface.prototype.useAfter = function (afterwares) {
        var _this = this;
        afterwares.map(function (afterware) {
            if (typeof afterware.applyBatchAfterware === 'function') {
                _this._afterwares.push(afterware);
            }
            else {
                throw new Error('Batch afterware must implement the applyBatchAfterware function');
            }
        });
        return this;
    };
    HTTPBatchedNetworkInterface.prototype.batchedFetchFromRemoteEndpoint = function (batchRequestAndOptions) {
        var options = {};
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_assign__["a" /* assign */])(options, batchRequestAndOptions.options);
        var printedRequests = batchRequestAndOptions.requests.map(function (request) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__networkInterface__["c" /* printRequest */])(request);
        });
        return fetch(this._uri, __assign({}, this._opts, { body: JSON.stringify(printedRequests), method: 'POST' }, options, { headers: __assign({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers) }));
    };
    return HTTPBatchedNetworkInterface;
}(__WEBPACK_IMPORTED_MODULE_1__networkInterface__["d" /* BaseNetworkInterface */]));

function createBatchingNetworkInterface(options) {
    if (!options) {
        throw new Error('You must pass an options argument to createNetworkInterface.');
    }
    return new HTTPBatchedNetworkInterface(options.uri, options.batchInterval, options.opts || {});
}
//# sourceMappingURL=batchedNetworkInterface.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryBatcher; });
var QueryBatcher = (function () {
    function QueryBatcher(_a) {
        var batchInterval = _a.batchInterval, batchFetchFunction = _a.batchFetchFunction;
        this.queuedRequests = [];
        this.queuedRequests = [];
        this.batchInterval = batchInterval;
        this.batchFetchFunction = batchFetchFunction;
    }
    QueryBatcher.prototype.enqueueRequest = function (request) {
        var fetchRequest = {
            request: request,
        };
        this.queuedRequests.push(fetchRequest);
        fetchRequest.promise = new Promise(function (resolve, reject) {
            fetchRequest.resolve = resolve;
            fetchRequest.reject = reject;
        });
        if (this.queuedRequests.length === 1) {
            this.scheduleQueueConsumption();
        }
        return fetchRequest.promise;
    };
    QueryBatcher.prototype.consumeQueue = function () {
        var requests = this.queuedRequests.map(function (queuedRequest) { return queuedRequest.request; });
        var promises = [];
        var resolvers = [];
        var rejecters = [];
        this.queuedRequests.forEach(function (fetchRequest, index) {
            promises.push(fetchRequest.promise);
            resolvers.push(fetchRequest.resolve);
            rejecters.push(fetchRequest.reject);
        });
        this.queuedRequests = [];
        var batchedPromise = this.batchFetchFunction(requests);
        batchedPromise.then(function (results) {
            results.forEach(function (result, index) {
                resolvers[index](result);
            });
        }).catch(function (error) {
            rejecters.forEach(function (rejecter, index) {
                rejecters[index](error);
            });
        });
        return promises;
    };
    QueryBatcher.prototype.scheduleQueueConsumption = function () {
        var _this = this;
        setTimeout(function () {
            _this.consumeQueue();
        }, this.batchInterval);
    };
    return QueryBatcher;
}());

//# sourceMappingURL=batching.js.map

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cloneDeep;
function cloneDeep(value) {
    if (Array.isArray(value)) {
        return value.map(function (item) { return cloneDeep(item); });
    }
    if (value !== null && typeof value === 'object') {
        var nextValue = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                nextValue[key] = cloneDeep(value[key]);
            }
        }
        return nextValue;
    }
    return value;
}
//# sourceMappingURL=cloneDeep.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.version = "1.1.1"

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(37);

var _app = __webpack_require__(36);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _app2.default)(window);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function shouldInclude(selection, variables) {
    if (!variables) {
        variables = {};
    }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            return;
        }
        var directiveArguments = directive.arguments;
        var directiveName = directive.name.value;
        if (directiveArguments.length !== 1) {
            throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
        }
        var ifArgument = directive.arguments[0];
        if (!ifArgument.name || ifArgument.name.value !== 'if') {
            throw new Error("Invalid argument for the @" + directiveName + " directive.");
        }
        var ifValue = directive.arguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            if (ifValue.kind !== 'Variable') {
                throw new Error("Argument for the @" + directiveName + " directive must be a variable or a bool ean value.");
            }
            else {
                evaledValue = variables[ifValue.name.value];
                if (evaledValue === undefined) {
                    throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                }
            }
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}
exports.shouldInclude = shouldInclude;
//# sourceMappingURL=directives.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var numOpDefinitions = doc.definitions.filter(function (definition) {
        return definition.kind === 'OperationDefinition';
    }).length;
    if (numOpDefinitions > 1) {
        throw new Error('Queries must have exactly one operation definition.');
    }
}
function getFragmentDefinitions(doc) {
    var fragmentDefinitions = doc.definitions.filter(function (definition) {
        if (definition.kind === 'FragmentDefinition') {
            return true;
        }
        else {
            return false;
        }
    });
    return fragmentDefinitions;
}
exports.getFragmentDefinitions = getFragmentDefinitions;
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
exports.createFragmentMap = createFragmentMap;
function getMainDefinition(queryDoc) {
    checkDocument(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'query' || operation === 'mutation' || operation === 'subscription') {
                return definition;
            }
        }
        if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw new Error('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
exports.getMainDefinition = getMainDefinition;
//# sourceMappingURL=getFromAST.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = __webpack_require__(57);
exports.filter = utilities_1.filter;
exports.check = utilities_1.check;
exports.propType = utilities_1.propType;
var graphql_1 = __webpack_require__(26);
exports.default = graphql_1.graphql;
//# sourceMappingURL=index.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isScalarValue(value) {
    var SCALAR_TYPES = {
        StringValue: 1,
        BooleanValue: 1,
        EnumValue: 1,
    };
    return !!SCALAR_TYPES[value.kind];
}
function isNumberValue(value) {
    var NUMBER_TYPES = {
        IntValue: 1,
        FloatValue: 1,
    };
    return NUMBER_TYPES[value.kind];
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObject(value) {
    return value.kind === 'ObjectValue';
}
function isList(value) {
    return value.kind === 'ListValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isNumberValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isScalarValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObject(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) { return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables); });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isList(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\" is not supported. Use variables instead of inline arguments to overcome this limitation.");
    }
}
function argumentsObjectFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
exports.argumentsObjectFromField = argumentsObjectFromField;
function resultKeyNameFromField(field) {
    return field.alias ?
        field.alias.value :
        field.name.value;
}
exports.resultKeyNameFromField = resultKeyNameFromField;
function isField(selection) {
    return selection.kind === 'Field';
}
exports.isField = isField;
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
exports.isInlineFragment = isInlineFragment;
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
exports.graphQLResultHasError = graphQLResultHasError;
//# sourceMappingURL=storeUtils.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = __webpack_require__(26);
function filter(doc, data) {
    var resolver = function (fieldName, root, args, context, info) {
        return root[info.resultKey];
    };
    return graphql_1.graphql(resolver, doc, data);
}
exports.filter = filter;
function check(doc, data) {
    var resolver = function (fieldName, root, args, context, info) {
        if (!{}.hasOwnProperty.call(root, info.resultKey)) {
            throw new Error(info.resultKey + " missing on " + root);
        }
        return root[info.resultKey];
    };
    graphql_1.graphql(resolver, doc, data, {}, {}, {
        fragmentMatcher: function () { return false; },
    });
}
exports.check = check;
var ANONYMOUS = '<<anonymous>>';
function PropTypeError(message) {
    this.message = message;
    this.stack = '';
}
PropTypeError.prototype = Error.prototype;
var reactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
};
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (props[propName] == null) {
            var locationName = reactPropTypeLocationNames[location];
            if (isRequired) {
                if (props[propName] === null) {
                    return new PropTypeError("The " + locationName + " `" + propFullName + "` is marked as required " +
                        ("in `" + componentName + "`, but its value is `null`."));
                }
                return new PropTypeError("The " + locationName + " `" + propFullName + "` is marked as required in " +
                    ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
        }
        else {
            return validate(props, propName, componentName, location, propFullName);
        }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
}
function propType(doc) {
    return createChainableTypeChecker(function (props, propName) {
        var prop = props[propName];
        try {
            check(doc, prop);
            return null;
        }
        catch (e) {
            return e;
        }
    });
}
exports.propType = propType;
//# sourceMappingURL=utilities.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(65);

var parse = parser.parse;

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}

// A map docString -> graphql document
var docCache = {};

// A map fragmentName -> [normalized source]
var fragmentSourceMap = {};

function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

// For testing.
function resetCaches() {
  docCache = {};
  fragmentSourceMap = {};
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
var printFragmentWarnings = true;
function processFragments(ast) {
  var astFragmentMap = {};
  var definitions = [];

  for (var i = 0; i < ast.definitions.length; i++) {
    var fragmentDefinition = ast.definitions[i];

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {

        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\n"
            + "graphql-tag enforces all fragment names across your application to be unique; read more about\n"
            + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }

        fragmentSourceMap[fragmentName][sourceKey] = true;

      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {};
        fragmentSourceMap[fragmentName][sourceKey] = true;
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true;
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  }

  ast.definitions = definitions;
  return ast;
}

function disableFragmentWarnings() {
  printFragmentWarnings = false;
}

function stripLoc(doc, removeLocAtThisLevel) {
  var docType = Object.prototype.toString.call(doc);

  if (docType === '[object Array]') {
    return doc.map(function (d) {
      return stripLoc(d, removeLocAtThisLevel);
    });
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.');
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc;
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken;
    delete doc.loc.endToken;
  }

  var keys = Object.keys(doc);
  var key;
  var value;
  var valueType;

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]];
      valueType = Object.prototype.toString.call(value);

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true);
      }
    }
  }

  return doc;
}

function parseDocument(doc) {
  var cacheKey = normalize(doc);

  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }

  var parsed = parse(doc);
  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.');
  }

  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed);
  parsed = stripLoc(parsed, false);
  docCache[cacheKey] = parsed;

  return parsed;
}

// XXX This should eventually disallow arbitrary string interpolation, like Relay does
function gql(/* arguments */) {
  var args = Array.prototype.slice.call(arguments);

  var literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  var result = literals[0];

  for (var i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body;
    } else {
      result += args[i];
    }

    result += literals[i];
  }

  return parseDocument(result);
}

// Support typescript, which isn't as nice as Babel about default exports
gql.default = gql;
gql.resetCaches = resetCaches;
gql.disableFragmentWarnings = disableFragmentWarnings;

module.exports = gql;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = formatError;

var _invariant = __webpack_require__(62);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error) {
  (0, _invariant2.default)(error, 'Received null or undefined error.');
  return {
    message: error.message,
    locations: error.locations,
    path: error.path
  };
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locatedError = locatedError;

var _GraphQLError = __webpack_require__(16);

/**
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(originalError, nodes, path) {
  // Note: this uses a brand-check to support GraphQL errors originating from
  // other contexts.
  if (originalError && originalError.path) {
    return originalError;
  }

  var message = originalError ? originalError.message || String(originalError) : 'An unknown error occurred.';
  return new _GraphQLError.GraphQLError(message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxError = syntaxError;

var _location = __webpack_require__(28);

var _GraphQLError = __webpack_require__(16);

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function syntaxError(source, position, description) {
  var location = (0, _location.getLocation)(source, position);
  var error = new _GraphQLError.GraphQLError('Syntax Error ' + source.name + ' (' + location.line + ':' + location.column + ') ' + description + '\n\n' + highlightSourceAtLocation(source, location), undefined, source, [position]);
  return error;
}

/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */
function highlightSourceAtLocation(source, location) {
  var line = location.line;
  var prevLineNum = (line - 1).toString();
  var lineNum = line.toString();
  var nextLineNum = (line + 1).toString();
  var padLen = nextLineNum.length;
  var lines = source.body.split(/\r\n|[\n\r]/g);
  return (line >= 2 ? lpad(padLen, prevLineNum) + ': ' + lines[line - 2] + '\n' : '') + lpad(padLen, lineNum) + ': ' + lines[line - 1] + '\n' + Array(2 + padLen + location.column).join(' ') + '^\n' + (line < lines.length ? lpad(padLen, nextLineNum) + ': ' + lines[line] + '\n' : '');
}

function lpad(len, str) {
  return Array(len - str.length + 1).join(' ') + str;
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Name

var NAME = exports.NAME = 'Name';

// Document

var DOCUMENT = exports.DOCUMENT = 'Document';
var OPERATION_DEFINITION = exports.OPERATION_DEFINITION = 'OperationDefinition';
var VARIABLE_DEFINITION = exports.VARIABLE_DEFINITION = 'VariableDefinition';
var VARIABLE = exports.VARIABLE = 'Variable';
var SELECTION_SET = exports.SELECTION_SET = 'SelectionSet';
var FIELD = exports.FIELD = 'Field';
var ARGUMENT = exports.ARGUMENT = 'Argument';

// Fragments

var FRAGMENT_SPREAD = exports.FRAGMENT_SPREAD = 'FragmentSpread';
var INLINE_FRAGMENT = exports.INLINE_FRAGMENT = 'InlineFragment';
var FRAGMENT_DEFINITION = exports.FRAGMENT_DEFINITION = 'FragmentDefinition';

// Values

var INT = exports.INT = 'IntValue';
var FLOAT = exports.FLOAT = 'FloatValue';
var STRING = exports.STRING = 'StringValue';
var BOOLEAN = exports.BOOLEAN = 'BooleanValue';
var NULL = exports.NULL = 'NullValue';
var ENUM = exports.ENUM = 'EnumValue';
var LIST = exports.LIST = 'ListValue';
var OBJECT = exports.OBJECT = 'ObjectValue';
var OBJECT_FIELD = exports.OBJECT_FIELD = 'ObjectField';

// Directives

var DIRECTIVE = exports.DIRECTIVE = 'Directive';

// Types

var NAMED_TYPE = exports.NAMED_TYPE = 'NamedType';
var LIST_TYPE = exports.LIST_TYPE = 'ListType';
var NON_NULL_TYPE = exports.NON_NULL_TYPE = 'NonNullType';

// Type System Definitions

var SCHEMA_DEFINITION = exports.SCHEMA_DEFINITION = 'SchemaDefinition';
var OPERATION_TYPE_DEFINITION = exports.OPERATION_TYPE_DEFINITION = 'OperationTypeDefinition';

// Type Definitions

var SCALAR_TYPE_DEFINITION = exports.SCALAR_TYPE_DEFINITION = 'ScalarTypeDefinition';
var OBJECT_TYPE_DEFINITION = exports.OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition';
var FIELD_DEFINITION = exports.FIELD_DEFINITION = 'FieldDefinition';
var INPUT_VALUE_DEFINITION = exports.INPUT_VALUE_DEFINITION = 'InputValueDefinition';
var INTERFACE_TYPE_DEFINITION = exports.INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition';
var UNION_TYPE_DEFINITION = exports.UNION_TYPE_DEFINITION = 'UnionTypeDefinition';
var ENUM_TYPE_DEFINITION = exports.ENUM_TYPE_DEFINITION = 'EnumTypeDefinition';
var ENUM_VALUE_DEFINITION = exports.ENUM_VALUE_DEFINITION = 'EnumValueDefinition';
var INPUT_OBJECT_TYPE_DEFINITION = exports.INPUT_OBJECT_TYPE_DEFINITION = 'InputObjectTypeDefinition';

// Type Extensions

var TYPE_EXTENSION_DEFINITION = exports.TYPE_EXTENSION_DEFINITION = 'TypeExtensionDefinition';

// Directive Definitions

var DIRECTIVE_DEFINITION = exports.DIRECTIVE_DEFINITION = 'DirectiveDefinition';

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenKind = undefined;
exports.createLexer = createLexer;
exports.getTokenDesc = getTokenDesc;

var _error = __webpack_require__(27);

/**
 * Given a Source object, this returns a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
function createLexer(source, options) {
  var startOfFileToken = new Tok(SOF, 0, 0, 0, 0, null);
  var lexer = {
    source: source,
    options: options,
    lastToken: startOfFileToken,
    token: startOfFileToken,
    line: 1,
    lineStart: 0,
    advance: advanceLexer
  };
  return lexer;
} /*  /
  /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

function advanceLexer() {
  var token = this.lastToken = this.token;
  if (token.kind !== EOF) {
    do {
      token = token.next = readToken(this, token);
    } while (token.kind === COMMENT);
    this.token = token;
  }
  return token;
}

/**
 * The return type of createLexer.
 */


// Each kind of token.
var SOF = '<SOF>';
var EOF = '<EOF>';
var BANG = '!';
var DOLLAR = '$';
var PAREN_L = '(';
var PAREN_R = ')';
var SPREAD = '...';
var COLON = ':';
var EQUALS = '=';
var AT = '@';
var BRACKET_L = '[';
var BRACKET_R = ']';
var BRACE_L = '{';
var PIPE = '|';
var BRACE_R = '}';
var NAME = 'Name';
var INT = 'Int';
var FLOAT = 'Float';
var STRING = 'String';
var COMMENT = 'Comment';

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = exports.TokenKind = {
  SOF: SOF,
  EOF: EOF,
  BANG: BANG,
  DOLLAR: DOLLAR,
  PAREN_L: PAREN_L,
  PAREN_R: PAREN_R,
  SPREAD: SPREAD,
  COLON: COLON,
  EQUALS: EQUALS,
  AT: AT,
  BRACKET_L: BRACKET_L,
  BRACKET_R: BRACKET_R,
  BRACE_L: BRACE_L,
  PIPE: PIPE,
  BRACE_R: BRACE_R,
  NAME: NAME,
  INT: INT,
  FLOAT: FLOAT,
  STRING: STRING,
  COMMENT: COMMENT
};

/**
 * A helper function to describe a token as a string for debugging
 */
function getTokenDesc(token) {
  var value = token.value;
  return value ? token.kind + ' "' + value + '"' : token.kind;
}

var charCodeAt = String.prototype.charCodeAt;
var slice = String.prototype.slice;

/**
 * Helper function for constructing the Token object.
 */
function Tok(kind, start, end, line, column, prev, value) {
  this.kind = kind;
  this.start = start;
  this.end = end;
  this.line = line;
  this.column = column;
  this.value = value;
  this.prev = prev;
  this.next = null;
}

// Print a simplified form when appearing in JSON/util.inspect.
Tok.prototype.toJSON = Tok.prototype.inspect = function toJSON() {
  return {
    kind: this.kind,
    value: this.value,
    line: this.line,
    column: this.column
  };
};

function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? EOF :
    // Trust JSON for ASCII.
    code < 0x007F ? JSON.stringify(String.fromCharCode(code)) :
    // Otherwise print the escaped form.
    '"\\u' + ('00' + code.toString(16).toUpperCase()).slice(-4) + '"'
  );
}

/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace and comments until it finds the next lexable
 * token, then lexes punctuators immediately or calls the appropriate helper
 * function for more complicated tokens.
 */
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;

  var position = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + position - lexer.lineStart;

  if (position >= bodyLength) {
    return new Tok(EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = charCodeAt.call(body, position);

  // SourceCharacter
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000A && code !== 0x000D) {
    throw (0, _error.syntaxError)(source, position, 'Cannot contain the invalid character ' + printCharCode(code) + '.');
  }

  switch (code) {
    // !
    case 33:
      return new Tok(BANG, position, position + 1, line, col, prev);
    // #
    case 35:
      return readComment(source, position, line, col, prev);
    // $
    case 36:
      return new Tok(DOLLAR, position, position + 1, line, col, prev);
    // (
    case 40:
      return new Tok(PAREN_L, position, position + 1, line, col, prev);
    // )
    case 41:
      return new Tok(PAREN_R, position, position + 1, line, col, prev);
    // .
    case 46:
      if (charCodeAt.call(body, position + 1) === 46 && charCodeAt.call(body, position + 2) === 46) {
        return new Tok(SPREAD, position, position + 3, line, col, prev);
      }
      break;
    // :
    case 58:
      return new Tok(COLON, position, position + 1, line, col, prev);
    // =
    case 61:
      return new Tok(EQUALS, position, position + 1, line, col, prev);
    // @
    case 64:
      return new Tok(AT, position, position + 1, line, col, prev);
    // [
    case 91:
      return new Tok(BRACKET_L, position, position + 1, line, col, prev);
    // ]
    case 93:
      return new Tok(BRACKET_R, position, position + 1, line, col, prev);
    // {
    case 123:
      return new Tok(BRACE_L, position, position + 1, line, col, prev);
    // |
    case 124:
      return new Tok(PIPE, position, position + 1, line, col, prev);
    // }
    case 125:
      return new Tok(BRACE_R, position, position + 1, line, col, prev);
    // A-Z _ a-z
    case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:
    case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:
    case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:
    case 89:case 90:
    case 95:
    case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:
    case 105:case 106:case 107:case 108:case 109:case 110:case 111:
    case 112:case 113:case 114:case 115:case 116:case 117:case 118:
    case 119:case 120:case 121:case 122:
      return readName(source, position, line, col, prev);
    // - 0-9
    case 45:
    case 48:case 49:case 50:case 51:case 52:
    case 53:case 54:case 55:case 56:case 57:
      return readNumber(source, position, code, line, col, prev);
    // "
    case 34:
      return readString(source, position, line, col, prev);
  }

  throw (0, _error.syntaxError)(source, position, unexpectedCharacterMessage(code));
}

/**
 * Report a message that an unexpected character was encountered.
 */
function unexpectedCharacterMessage(code) {
  if (code === 39) {
    // '
    return 'Unexpected single quote character (\'), did you mean to use ' + 'a double quote (")?';
  }

  return 'Cannot parse the unexpected character ' + printCharCode(code) + '.';
}

/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * or commented character, then returns the position of that character for
 * lexing.
 */
function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;
  while (position < bodyLength) {
    var code = charCodeAt.call(body, position);
    // tab | space | comma | BOM
    if (code === 9 || code === 32 || code === 44 || code === 0xFEFF) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (charCodeAt.call(body, position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }
  return position;
}

/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code = void 0;
  var position = start;

  do {
    code = charCodeAt.call(body, ++position);
  } while (code !== null && (
  // SourceCharacter but not LineTerminator
  code > 0x001F || code === 0x0009));

  return new Tok(COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
}

/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = charCodeAt.call(body, ++position);
  }

  if (code === 48) {
    // 0
    code = charCodeAt.call(body, ++position);
    if (code >= 48 && code <= 57) {
      throw (0, _error.syntaxError)(source, position, 'Invalid number, unexpected digit after 0: ' + printCharCode(code) + '.');
    }
  } else {
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 46) {
    // .
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    if (code === 43 || code === 45) {
      // + -
      code = charCodeAt.call(body, ++position);
    }
    position = readDigits(source, position, code);
  }

  return new Tok(isFloat ? FLOAT : INT, start, position, line, col, prev, slice.call(body, start, position));
}

/**
 * Returns the new position in the source after reading digits.
 */
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = charCodeAt.call(body, ++position);
    } while (code >= 48 && code <= 57); // 0 - 9
    return position;
  }
  throw (0, _error.syntaxError)(source, position, 'Invalid number, expected digit but got: ' + printCharCode(code) + '.');
}

/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null &&
  // not LineTerminator
  code !== 0x000A && code !== 0x000D &&
  // not Quote (")
  code !== 34) {
    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009) {
      throw (0, _error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    ++position;
    if (code === 92) {
      // \
      value += slice.call(body, chunkStart, position - 1);
      code = charCodeAt.call(body, position);
      switch (code) {
        case 34:
          value += '"';break;
        case 47:
          value += '/';break;
        case 92:
          value += '\\';break;
        case 98:
          value += '\b';break;
        case 102:
          value += '\f';break;
        case 110:
          value += '\n';break;
        case 114:
          value += '\r';break;
        case 116:
          value += '\t';break;
        case 117:
          // u
          var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));
          if (charCode < 0) {
            throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: ' + ('\\u' + body.slice(position + 1, position + 5) + '.'));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        default:
          throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: \\' + String.fromCharCode(code) + '.');
      }
      ++position;
      chunkStart = position;
    }
  }

  if (code !== 34) {
    // quote (")
    throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
  }

  value += slice.call(body, chunkStart, position);
  return new Tok(STRING, start, position + 1, line, col, prev, value);
}

/**
 * Converts four hexidecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}

/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 : // 0-9
  a >= 65 && a <= 70 ? a - 55 : // A-F
  a >= 97 && a <= 102 ? a - 87 : // a-f
  -1;
}

/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */
function readName(source, position, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var end = position + 1;
  var code = 0;
  while (end !== bodyLength && (code = charCodeAt.call(body, end)) !== null && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122 // a-z
  )) {
    ++end;
  }
  return new Tok(NAME, position, end, line, col, prev, slice.call(body, position, end));
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;
exports.parseConstValue = parseConstValue;
exports.parseTypeReference = parseTypeReference;
exports.parseNamedType = parseNamedType;

var _source = __webpack_require__(66);

var _error = __webpack_require__(27);

var _lexer = __webpack_require__(64);

var _kinds = __webpack_require__(63);

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */


/**
 * Configuration options to control parser behavior
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function parse(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  return parseDocument(lexer);
}

/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */
function parseValue(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var value = parseValueLiteral(lexer, false);
  expect(lexer, _lexer.TokenKind.EOF);
  return value;
}

/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */
function parseType(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var type = parseTypeReference(lexer);
  expect(lexer, _lexer.TokenKind.EOF);
  return type;
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(lexer) {
  var token = expect(lexer, _lexer.TokenKind.NAME);
  return {
    kind: _kinds.NAME,
    value: token.value,
    loc: loc(lexer, token)
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SOF);
  var definitions = [];
  do {
    definitions.push(parseDefinition(lexer));
  } while (!skip(lexer, _lexer.TokenKind.EOF));

  return {
    kind: _kinds.DOCUMENT,
    definitions: definitions,
    loc: loc(lexer, start)
  };
}

/**
 * Definition :
 *   - OperationDefinition
 *   - FragmentDefinition
 *   - TypeSystemDefinition
 */
function parseDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer);
  }

  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      // Note: subscription is an experimental non-spec addition.
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer);

      case 'fragment':
        return parseFragmentDefinition(lexer);

      // Note: the Type System IDL is an experimental non-spec addition.
      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'extend':
      case 'directive':
        return parseTypeSystemDefinition(lexer);
    }
  }

  throw unexpected(lexer);
}

// Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */
function parseOperationDefinition(lexer) {
  var start = lexer.token;
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return {
      kind: _kinds.OPERATION_DEFINITION,
      operation: 'query',
      name: null,
      variableDefinitions: null,
      directives: [],
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }
  var operation = parseOperationType(lexer);
  var name = void 0;
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    name = parseName(lexer);
  }
  return {
    kind: _kinds.OPERATION_DEFINITION,
    operation: operation,
    name: name,
    variableDefinitions: parseVariableDefinitions(lexer),
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * OperationType : one of query mutation subscription
 */
function parseOperationType(lexer) {
  var operationToken = expect(lexer, _lexer.TokenKind.NAME);
  switch (operationToken.value) {
    case 'query':
      return 'query';
    case 'mutation':
      return 'mutation';
    // Note: subscription is an experimental non-spec addition.
    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer, operationToken);
}

/**
 * VariableDefinitions : ( VariableDefinition+ )
 */
function parseVariableDefinitions(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseVariableDefinition, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * VariableDefinition : Variable : Type DefaultValue?
 */
function parseVariableDefinition(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.VARIABLE_DEFINITION,
    variable: parseVariable(lexer),
    type: (expect(lexer, _lexer.TokenKind.COLON), parseTypeReference(lexer)),
    defaultValue: skip(lexer, _lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : null,
    loc: loc(lexer, start)
  };
}

/**
 * Variable : $ Name
 */
function parseVariable(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.DOLLAR);
  return {
    kind: _kinds.VARIABLE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * SelectionSet : { Selection+ }
 */
function parseSelectionSet(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.SELECTION_SET,
    selections: many(lexer, _lexer.TokenKind.BRACE_L, parseSelection, _lexer.TokenKind.BRACE_R),
    loc: loc(lexer, start)
  };
}

/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */
function parseSelection(lexer) {
  return peek(lexer, _lexer.TokenKind.SPREAD) ? parseFragment(lexer) : parseField(lexer);
}

/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */
function parseField(lexer) {
  var start = lexer.token;

  var nameOrAlias = parseName(lexer);
  var alias = void 0;
  var name = void 0;
  if (skip(lexer, _lexer.TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer);
  } else {
    alias = null;
    name = nameOrAlias;
  }

  return {
    kind: _kinds.FIELD,
    alias: alias,
    name: name,
    arguments: parseArguments(lexer),
    directives: parseDirectives(lexer),
    selectionSet: peek(lexer, _lexer.TokenKind.BRACE_L) ? parseSelectionSet(lexer) : null,
    loc: loc(lexer, start)
  };
}

/**
 * Arguments : ( Argument+ )
 */
function parseArguments(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseArgument, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * Argument : Name : Value
 */
function parseArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, false)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */
function parseFragment(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SPREAD);
  if (peek(lexer, _lexer.TokenKind.NAME) && lexer.token.value !== 'on') {
    return {
      kind: _kinds.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer),
      directives: parseDirectives(lexer),
      loc: loc(lexer, start)
    };
  }
  var typeCondition = null;
  if (lexer.token.value === 'on') {
    lexer.advance();
    typeCondition = parseNamedType(lexer);
  }
  return {
    kind: _kinds.INLINE_FRAGMENT,
    typeCondition: typeCondition,
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */
function parseFragmentDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'fragment');
  return {
    kind: _kinds.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer),
    typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentName : Name but not `on`
 */
function parseFragmentName(lexer) {
  if (lexer.token.value === 'on') {
    throw unexpected(lexer);
  }
  return parseName(lexer);
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(lexer, isConst) {
  var token = lexer.token;
  switch (token.kind) {
    case _lexer.TokenKind.BRACKET_L:
      return parseList(lexer, isConst);
    case _lexer.TokenKind.BRACE_L:
      return parseObject(lexer, isConst);
    case _lexer.TokenKind.INT:
      lexer.advance();
      return {
        kind: _kinds.INT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.FLOAT:
      lexer.advance();
      return {
        kind: _kinds.FLOAT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.STRING:
      lexer.advance();
      return {
        kind: _kinds.STRING,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer.advance();
        return {
          kind: _kinds.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer, token)
        };
      } else if (token.value === 'null') {
        lexer.advance();
        return {
          kind: _kinds.NULL,
          loc: loc(lexer, token)
        };
      }
      lexer.advance();
      return {
        kind: _kinds.ENUM,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer);
      }
      break;
  }
  throw unexpected(lexer);
}

function parseConstValue(lexer) {
  return parseValueLiteral(lexer, true);
}

function parseValueValue(lexer) {
  return parseValueLiteral(lexer, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(lexer, isConst) {
  var start = lexer.token;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: _kinds.LIST,
    values: any(lexer, _lexer.TokenKind.BRACKET_L, item, _lexer.TokenKind.BRACKET_R),
    loc: loc(lexer, start)
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.BRACE_L);
  var fields = [];
  while (!skip(lexer, _lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(lexer, isConst));
  }
  return {
    kind: _kinds.OBJECT,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(lexer, isConst) {
  var start = lexer.token;
  return {
    kind: _kinds.OBJECT_FIELD,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, isConst)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives : Directive+
 */
function parseDirectives(lexer) {
  var directives = [];
  while (peek(lexer, _lexer.TokenKind.AT)) {
    directives.push(parseDirective(lexer));
  }
  return directives;
}

/**
 * Directive : @ Name Arguments?
 */
function parseDirective(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.AT);
  return {
    kind: _kinds.DIRECTIVE,
    name: parseName(lexer),
    arguments: parseArguments(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */
function parseTypeReference(lexer) {
  var start = lexer.token;
  var type = void 0;
  if (skip(lexer, _lexer.TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer);
    expect(lexer, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  } else {
    type = parseNamedType(lexer);
  }
  if (skip(lexer, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.NON_NULL_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  }
  return type;
}

/**
 * NamedType : Name
 */
function parseNamedType(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.NAMED_TYPE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - TypeExtensionDefinition
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'schema':
        return parseSchemaDefinition(lexer);
      case 'scalar':
        return parseScalarTypeDefinition(lexer);
      case 'type':
        return parseObjectTypeDefinition(lexer);
      case 'interface':
        return parseInterfaceTypeDefinition(lexer);
      case 'union':
        return parseUnionTypeDefinition(lexer);
      case 'enum':
        return parseEnumTypeDefinition(lexer);
      case 'input':
        return parseInputObjectTypeDefinition(lexer);
      case 'extend':
        return parseTypeExtensionDefinition(lexer);
      case 'directive':
        return parseDirectiveDefinition(lexer);
    }
  }

  throw unexpected(lexer);
}

/**
 * SchemaDefinition : schema Directives? { OperationTypeDefinition+ }
 *
 * OperationTypeDefinition : OperationType : NamedType
 */
function parseSchemaDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'schema');
  var directives = parseDirectives(lexer);
  var operationTypes = many(lexer, _lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.SCHEMA_DEFINITION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer, start)
  };
}

function parseOperationTypeDefinition(lexer) {
  var start = lexer.token;
  var operation = parseOperationType(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseNamedType(lexer);
  return {
    kind: _kinds.OPERATION_TYPE_DEFINITION,
    operation: operation,
    type: type,
    loc: loc(lexer, start)
  };
}

/**
 * ScalarTypeDefinition : scalar Name Directives?
 */
function parseScalarTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.SCALAR_TYPE_DEFINITION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectTypeDefinition :
 *   - type Name ImplementsInterfaces? Directives? { FieldDefinition+ }
 */
function parseObjectTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.OBJECT_TYPE_DEFINITION,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ImplementsInterfaces : implements NamedType+
 */
function parseImplementsInterfaces(lexer) {
  var types = [];
  if (lexer.token.value === 'implements') {
    lexer.advance();
    do {
      types.push(parseNamedType(lexer));
    } while (peek(lexer, _lexer.TokenKind.NAME));
  }
  return types;
}

/**
 * FieldDefinition : Name ArgumentsDefinition? : Type Directives?
 */
function parseFieldDefinition(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.FIELD_DEFINITION,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(lexer) {
  if (!peek(lexer, _lexer.TokenKind.PAREN_L)) {
    return [];
  }
  return many(lexer, _lexer.TokenKind.PAREN_L, parseInputValueDef, _lexer.TokenKind.PAREN_R);
}

/**
 * InputValueDefinition : Name : Type DefaultValue? Directives?
 */
function parseInputValueDef(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var defaultValue = null;
  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer);
  }
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.INPUT_VALUE_DEFINITION,
    name: name,
    type: type,
    defaultValue: defaultValue,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InterfaceTypeDefinition : interface Name Directives? { FieldDefinition+ }
 */
function parseInterfaceTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INTERFACE_TYPE_DEFINITION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * UnionTypeDefinition : union Name Directives? = UnionMembers
 */
function parseUnionTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  expect(lexer, _lexer.TokenKind.EQUALS);
  var types = parseUnionMembers(lexer);
  return {
    kind: _kinds.UNION_TYPE_DEFINITION,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}

/**
 * UnionMembers :
 *   - NamedType
 *   - UnionMembers | NamedType
 */
function parseUnionMembers(lexer) {
  var members = [];
  do {
    members.push(parseNamedType(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return members;
}

/**
 * EnumTypeDefinition : enum Name Directives? { EnumValueDefinition+ }
 */
function parseEnumTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var values = many(lexer, _lexer.TokenKind.BRACE_L, parseEnumValueDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.ENUM_TYPE_DEFINITION,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}

/**
 * EnumValueDefinition : EnumValue Directives?
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.ENUM_VALUE_DEFINITION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InputObjectTypeDefinition : input Name Directives? { InputValueDefinition+ }
 */
function parseInputObjectTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseInputValueDef, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INPUT_OBJECT_TYPE_DEFINITION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * TypeExtensionDefinition : extend ObjectTypeDefinition
 */
function parseTypeExtensionDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  var definition = parseObjectTypeDefinition(lexer);
  return {
    kind: _kinds.TYPE_EXTENSION_DEFINITION,
    definition: definition,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveDefinition :
 *   - directive @ Name ArgumentsDefinition? on DirectiveLocations
 */
function parseDirectiveDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'directive');
  expect(lexer, _lexer.TokenKind.AT);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expectKeyword(lexer, 'on');
  var locations = parseDirectiveLocations(lexer);
  return {
    kind: _kinds.DIRECTIVE_DEFINITION,
    name: name,
    arguments: args,
    locations: locations,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveLocations :
 *   - Name
 *   - DirectiveLocations | Name
 */
function parseDirectiveLocations(lexer) {
  var locations = [];
  do {
    locations.push(parseName(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return locations;
}

// Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(lexer, startToken) {
  if (!lexer.options.noLocation) {
    return new Loc(startToken, lexer.lastToken, lexer.source);
  }
}

function Loc(startToken, endToken, source) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source;
}

// Print a simplified form when appearing in JSON/util.inspect.
Loc.prototype.toJSON = Loc.prototype.inspect = function toJSON() {
  return { start: this.start, end: this.end };
};

/**
 * Determines if the next token is of a given kind
 */
function peek(lexer, kind) {
  return lexer.token.kind === kind;
}

/**
 * If the next token is of the given kind, return true after advancing
 * the lexer. Otherwise, do not change the parser state and return false.
 */
function skip(lexer, kind) {
  var match = lexer.token.kind === kind;
  if (match) {
    lexer.advance();
  }
  return match;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */
function expect(lexer, kind) {
  var token = lexer.token;
  if (token.kind === kind) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected ' + kind + ', found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the lexer. Otherwise, do not change the parser state and return
 * false.
 */
function expectKeyword(lexer, value) {
  var token = lexer.token;
  if (token.kind === _lexer.TokenKind.NAME && token.value === value) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected "' + value + '", found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(lexer, atToken) {
  var token = atToken || lexer.token;
  return (0, _error.syntaxError)(lexer.source, token.start, 'Unexpected ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [parseFn(lexer)];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * A representation of source input to GraphQL. The name is optional,
 * but is mostly useful for clients who store GraphQL documents in
 * source files; for example, if the GraphQL input is in a file Foo.graphql,
 * it might be useful for name to be "Foo.graphql".
 */
var Source = exports.Source = function Source(body, name) {
  _classCallCheck(this, Source);

  this.body = body;
  this.name = name || 'GraphQL';
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.visitWithTypeInfo = visitWithTypeInfo;
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

var QueryDocumentKeys = exports.QueryDocumentKeys = {
  Name: [],

  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],

  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', 'typeCondition', 'directives', 'selectionSet'],

  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],

  Directive: ['name', 'arguments'],

  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],

  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],

  ScalarTypeDefinition: ['name', 'directives'],
  ObjectTypeDefinition: ['name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['name', 'directives', 'fields'],
  UnionTypeDefinition: ['name', 'directives', 'types'],
  EnumTypeDefinition: ['name', 'directives', 'values'],
  EnumValueDefinition: ['name', 'directives'],
  InputObjectTypeDefinition: ['name', 'directives', 'fields'],

  TypeExtensionDefinition: ['definition'],

  DirectiveDefinition: ['name', 'arguments', 'locations']
};

var BREAK = exports.BREAK = {};

/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */
function visit(root, visitor, keyMap) {
  var visitorKeys = keyMap || QueryDocumentKeys;

  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;

  do {
    index++;
    var isLeaving = index === keys.length;
    var key = void 0;
    var node = void 0;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + JSON.stringify(node));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (!isLeaving) {
      stack = { inArray: inArray, index: index, keys: keys, edits: edits, prev: stack };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return maybeNode && typeof maybeNode.kind === 'string';
}

/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);

  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */false);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */true);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}

/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */false);
      if (fn) {
        var result = fn.apply(visitor, arguments);
        if (result !== undefined) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */true);
      var result = void 0;
      if (fn) {
        result = fn.apply(visitor, arguments);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}

/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(18);
module.exports = self.fetch.bind(self);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(73);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(35)))

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(74);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(29);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(70);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(31);
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



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
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
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
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
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

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(33);
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
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

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* unused harmony reexport bindActionCreators */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(82);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(83)(module)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);