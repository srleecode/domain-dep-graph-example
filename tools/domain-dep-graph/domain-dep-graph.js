"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProjectGraph = void 0;
var devkit_1 = require("@nrwl/devkit");
var layerNames = [
    'application',
    'data-access',
    'directive',
    'domain',
    'feature',
    'shell',
    'ui',
    'util',
];
function processProjectGraph(graph) {
    console.log(JSON.stringify(graph));
    var builder = new devkit_1.ProjectGraphBuilder(graph);
    var layerNameDomainNameMap = getLayerNameDomainNameMap(graph);
    var domainNameNodeMap = getDomainNameNodeMap(graph, layerNameDomainNameMap);
    addDomainNodes(builder, domainNameNodeMap);
    convertlibE2E(builder, graph, layerNameDomainNameMap);
    removeLayerLibraries(graph, layerNameDomainNameMap);
    convertAppLayerDependencies(graph, layerNameDomainNameMap);
    return builder.getUpdatedProjectGraph();
}
exports.processProjectGraph = processProjectGraph;
var isLayerLibraryNode = function (node) {
    if (node.type === 'lib') {
        var splitDirectory = node.data.root.split('/');
        var lastFolder_1 = splitDirectory[splitDirectory.length - 1];
        return layerNames.some(function (name) { return lastFolder_1.startsWith(name); });
    }
    return false;
};
var getDomainName = function (node) {
    if (!node || !isLayerLibraryNode(node)) {
        return '';
    }
    var splitDirectory = node.data.root.split('/');
    var lastDirectoryPath = splitDirectory[splitDirectory.length - 1];
    return node.name.replace("-".concat(lastDirectoryPath), '');
};
var getLayerNameDomainNameMap = function (graph) {
    var layerDomainMap = {};
    for (var key in graph.nodes) {
        var node = graph.nodes[key];
        if (isLayerLibraryNode(node)) {
            layerDomainMap[key] = getDomainName(node);
        }
    }
    return layerDomainMap;
};
var getDomainNameNodeMap = function (graph, layerNameDomainNameMap) {
    var domainNameNodeMap = {};
    var _loop_1 = function (layerName) {
        var layerNode = graph.nodes[layerName];
        var domainName = layerNameDomainNameMap[layerName];
        if (!domainNameNodeMap[domainName]) {
            domainNameNodeMap[domainName] = getDomainNode(layerNode);
        }
        var layerFiles = layerNode.data.files.map(function (file) {
            return getDomainNodeFile(domainName, file, layerNameDomainNameMap);
        });
        domainNameNodeMap[domainName].data.files = __spreadArray(__spreadArray([], layerFiles, true), domainNameNodeMap[domainName].data.files, true);
    };
    for (var layerName in layerNameDomainNameMap) {
        _loop_1(layerName);
    }
    return domainNameNodeMap;
};
var getDomainNodeFile = function (currDomainName, layerNodeFile, layerNameDomainNameMap) { return (__assign(__assign({}, layerNodeFile), { deps: getDepsForDomain(layerNodeFile === null || layerNodeFile === void 0 ? void 0 : layerNodeFile.deps, layerNameDomainNameMap, currDomainName) })); };
var getDepsForDomain = function (deps, layerNameDomainNameMap, currDomainName) {
    var domainDepSet = new Set();
    var domainNamesSet = new Set(Object.values(layerNameDomainNameMap));
    deps === null || deps === void 0 ? void 0 : deps.forEach(function (dep) {
        var domainName = domainNamesSet.has(dep)
            ? dep
            : layerNameDomainNameMap[dep];
        if (domainName) {
            if (!domainDepSet.has(domainName) && domainName !== currDomainName) {
                domainDepSet.add(domainName);
            }
        }
        else {
            domainDepSet.add(dep);
        }
    });
    return Array.from(domainDepSet);
};
var getDomainNode = function (layerNode) {
    var domainRoot = layerNode.data.root.substring(0, layerNode.data.root.lastIndexOf('/'));
    return {
        name: getDomainName(layerNode),
        type: 'lib',
        data: {
            root: domainRoot,
            sourceRoot: domainRoot,
            files: [],
            tags: [],
        },
    };
};
var convertlibE2E = function (builder, graph, layerNameDomainNameMap) {
    var _loop_2 = function (key) {
        if (key.startsWith('e2e-')) {
            var e2eNode = graph.nodes[key];
            e2eNode.type = 'e2e';
            e2eNode.data.projectType = 'application';
            var domainDeps = getDepsForDomain(e2eNode.data.implicitDependencies, layerNameDomainNameMap);
            e2eNode.data.implicitDependencies = [];
            domainDeps.forEach(function (dep) {
                builder.addImplicitDependency(key, dep);
            });
        }
    };
    for (var key in graph.nodes) {
        _loop_2(key);
    }
};
var addDomainNodes = function (builder, domainNameNodeMap) {
    return Object.values(domainNameNodeMap).forEach(function (node) { return builder.addNode(node); });
};
var removeLayerLibraries = function (graph, layerNameDomainNameMap) {
    for (var key in layerNameDomainNameMap) {
        delete graph.nodes[key];
    }
};
var convertAppLayerDependencies = function (graph, layerNameDomainNameMap) {
    for (var key in graph.nodes) {
        var node = graph.nodes[key];
        if (node.type === 'app') {
            node.data.files = node.data.files.map(function (file) { return (__assign(__assign({}, file), { deps: getDepsForDomain(file.deps, layerNameDomainNameMap) })); });
        }
    }
};
//# sourceMappingURL=domain-dep-graph.js.map