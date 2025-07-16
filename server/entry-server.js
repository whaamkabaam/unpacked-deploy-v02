var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useSearchParams, Link, useParams, Navigate, useLocation, Routes, Route, MemoryRouter } from "react-router-dom";
import * as React from "react";
import React__default, { Component, useState, useCallback, useEffect, useMemo, useRef } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronLeft, ChevronRight, Check, Circle, ArrowUpDown, ChevronDown, Search, RotateCcw, Filter, FilterX, BarChart3, Info, Target, DollarSign, Zap, Award, Medal, Trophy, Package, List, ExternalLink, Star, HelpCircle, AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Drawer as Drawer$1 } from "vaul";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-[9999] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const SUPABASE_URL = "https://qsrkzgywbcbfnmailmsp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcmt6Z3l3YmNiZm5tYWlsbXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzQ5OTcsImV4cCI6MjA1OTExMDk5N30.uqh8KDM_ks2lzo9Go-0ffCh2CFIURhQRb9qD84i6pQ0";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const PROVIDER_CONFIGS$1 = {
  rillabox: {
    tableName: "rillabox_boxes",
    displayName: "RillaBox",
    color: "purple",
    gradient: "from-purple-600 to-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700"
  },
  hypedrop: {
    tableName: "hypedrop_boxes",
    displayName: "Hypedrop",
    color: "blue",
    gradient: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700"
  },
  casesgg: {
    tableName: "casesgg_boxes",
    displayName: "Cases.GG",
    color: "green",
    gradient: "from-green-600 to-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700"
  },
  luxdrop: {
    tableName: "luxdrop_boxes",
    displayName: "Luxdrop",
    color: "amber",
    gradient: "from-amber-600 to-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700"
  }
};
const safeParseJSON$1 = (jsonData) => {
  if (!jsonData) return [];
  if (Array.isArray(jsonData)) {
    return jsonData.map((item) => {
      let dropChance = 0;
      if (item.item_dropchance_formatted) {
        const formatted = item.item_dropchance_formatted.toString().replace("%", "");
        dropChance = parseFloat(formatted) / 100;
      } else if (item.item_dropchance !== void 0) {
        dropChance = parseFloat(item.item_dropchance) / 100;
      } else if (item.drop_chance !== void 0) {
        dropChance = parseFloat(item.drop_chance) / 100;
      }
      return {
        name: item.item_name || item.name || "Unknown Item",
        value: parseFloat(item.item_value || item.value || item.price || 0),
        drop_chance: dropChance,
        image: item.item_image || item.image || "",
        type: item.type || item.item_type || ""
      };
    });
  }
  if (typeof jsonData === "string") {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        return safeParseJSON$1(parsed);
      }
    } catch (e) {
      console.warn("Failed to parse JSON string:", e);
    }
  }
  return [];
};
const parseTagsArray$1 = (tagsData) => {
  if (!tagsData) return [];
  if (Array.isArray(tagsData)) {
    return tagsData.filter((tag) => tag && typeof tag === "string");
  }
  if (typeof tagsData === "string") {
    try {
      const parsed = JSON.parse(tagsData);
      if (Array.isArray(parsed)) {
        return parsed.filter((tag) => tag && typeof tag === "string");
      }
    } catch (e) {
      return tagsData.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
    }
  }
  return [];
};
const calculateUnifiedSummaryStats = (boxes) => {
  if (!boxes || boxes.length === 0) {
    return {
      portfolio_average_ev_percent: 0,
      best_box_by_ev_percent: "N/A",
      best_box_ev_percent: 0,
      worst_box_by_ev_percent: "N/A",
      worst_box_ev_percent: 0,
      portfolio_average_standard_deviation_percent: 0,
      total_boxes: 0,
      provider_breakdown: {}
    };
  }
  const validBoxes = boxes.filter((box) => box.expected_value_percent_of_price && !isNaN(box.expected_value_percent_of_price));
  if (validBoxes.length === 0) {
    return {
      portfolio_average_ev_percent: 0,
      best_box_by_ev_percent: "N/A",
      best_box_ev_percent: 0,
      worst_box_by_ev_percent: "N/A",
      worst_box_ev_percent: 0,
      portfolio_average_standard_deviation_percent: 0,
      total_boxes: boxes.length,
      provider_breakdown: {}
    };
  }
  const avgEV = validBoxes.reduce((sum, box) => sum + Number(box.expected_value_percent_of_price), 0) / validBoxes.length;
  const bestBox = validBoxes.reduce(
    (best, current) => Number(current.expected_value_percent_of_price) > Number(best.expected_value_percent_of_price) ? current : best
  );
  const worstBox = validBoxes.reduce(
    (worst, current) => Number(current.expected_value_percent_of_price) < Number(worst.expected_value_percent_of_price) ? current : worst
  );
  const avgStdDev = validBoxes.filter((box) => box.standard_deviation_percent && !isNaN(box.standard_deviation_percent)).reduce((sum, box, _, arr) => sum + Number(box.standard_deviation_percent) / arr.length, 0);
  const provider_breakdown = boxes.reduce((acc, box) => {
    acc[box.provider] = (acc[box.provider] || 0) + 1;
    return acc;
  }, {});
  return {
    portfolio_average_ev_percent: avgEV,
    best_box_by_ev_percent: bestBox.box_name,
    best_box_ev_percent: Number(bestBox.expected_value_percent_of_price),
    worst_box_by_ev_percent: worstBox.box_name,
    worst_box_ev_percent: Number(worstBox.expected_value_percent_of_price),
    portfolio_average_standard_deviation_percent: avgStdDev,
    total_boxes: boxes.length,
    provider_breakdown
  };
};
const fetchUnifiedData = async (selectedProviders, limit = 1e3) => {
  console.log("Fetching unified mystery box data...");
  const allBoxes = [];
  const providersToFetch = (selectedProviders == null ? void 0 : selectedProviders.length) ? selectedProviders.filter((p) => p in PROVIDER_CONFIGS$1) : Object.keys(PROVIDER_CONFIGS$1);
  const fetchPromises = providersToFetch.map(async (providerKey) => {
    const provider = providerKey;
    const config = PROVIDER_CONFIGS$1[provider];
    console.log(`Fetching ${config.displayName} mystery boxes...`);
    try {
      const { data: boxesResult, error: boxesError } = await supabase.from(config.tableName).select(`
          box_name,
          box_price,
          box_image,
          expected_value_percent,
          volatility_bucket,
          standard_deviation_percent,
          floor_rate_percent,
          category,
          tags,
          jackpot_items,
          unwanted_items,
          all_items
        `).order("box_name").limit(limit);
      if (boxesError) {
        console.error(`Error fetching ${config.displayName} mystery boxes:`, boxesError);
        return [];
      }
      if (boxesResult && boxesResult.length > 0) {
        return boxesResult.map((box) => {
          const jackpotItems = safeParseJSON$1(box.jackpot_items);
          const unwantedItems = safeParseJSON$1(box.unwanted_items);
          let allItems = safeParseJSON$1(box.all_items);
          if (allItems.length === 0 && (jackpotItems.length > 0 || unwantedItems.length > 0)) {
            allItems = [...jackpotItems, ...unwantedItems];
            console.log(`Fixed empty all_items for box: ${box.box_name}, combined ${allItems.length} items`);
          }
          return {
            box_name: box.box_name || "Unknown Mystery Box",
            box_price: Number(box.box_price) || 0,
            box_image: box.box_image || "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
            expected_value_percent_of_price: Number(box.expected_value_percent) || 0,
            volatility_bucket: box.volatility_bucket || "Medium",
            standard_deviation_percent: Number(box.standard_deviation_percent) || 0,
            floor_rate_percent: Number(box.floor_rate_percent) || 0,
            category: box.category || "Mystery Boxes",
            tags: parseTagsArray$1(box.tags),
            jackpot_items: jackpotItems,
            unwanted_items: unwantedItems,
            all_items: allItems,
            provider,
            provider_config: config
          };
        });
      }
      return [];
    } catch (error) {
      console.error(`Error fetching ${config.displayName} mystery boxes:`, error);
      return [];
    }
  });
  const providerResults = await Promise.allSettled(fetchPromises);
  providerResults.forEach((result, index) => {
    if (result.status === "fulfilled") {
      allBoxes.push(...result.value);
    } else {
      console.error(`Provider ${providersToFetch[index]} failed:`, result.reason);
    }
  });
  console.log(`Total unified mystery boxes loaded: ${allBoxes.length}`);
  const summaryData = calculateUnifiedSummaryStats(allBoxes);
  return { allBoxes, summaryData };
};
const useUnifiedBoxData = (selectedProviders, limit) => {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["unifiedBoxData", selectedProviders == null ? void 0 : selectedProviders.sort(), limit],
    queryFn: () => fetchUnifiedData(selectedProviders, limit),
    staleTime: 5 * 60 * 1e3,
    // 5 minutes
    gcTime: 10 * 60 * 1e3,
    // 10 minutes (was cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 1e4)
  });
  return {
    summaryData: (data == null ? void 0 : data.summaryData) || null,
    boxesData: (data == null ? void 0 : data.allBoxes) || [],
    loading: isLoading,
    error: (error == null ? void 0 : error.message) || null,
    refetch
  };
};
function DotBackground({ children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative w-full bg-white", className), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "fixed inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#a855f7_1px,transparent_1px)]"
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 z-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
  ] });
}
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
const SkeletonBoxCard = () => {
  return /* @__PURE__ */ jsxs(Card, { className: "h-full bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "w-full h-40 rounded-lg mb-2 bg-white/20" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-3/4 bg-white/20" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-16 bg-white/20" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-12 bg-white/20" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-20 mx-auto bg-white/20" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 mx-auto bg-white/20" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-16 bg-white/20" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-12 bg-white/20" })
      ] })
    ] })
  ] });
};
const getTagColor = (tag) => {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes("steam") || tagLower.includes("valve")) return "bg-blue-500";
  if (tagLower.includes("xbox") || tagLower.includes("microsoft")) return "bg-green-500";
  if (tagLower.includes("playstation") || tagLower.includes("sony")) return "bg-indigo-500";
  if (tagLower.includes("nintendo")) return "bg-red-500";
  if (tagLower.includes("epic")) return "bg-gray-700";
  if (tagLower.includes("fps") || tagLower.includes("shooter")) return "bg-orange-500";
  if (tagLower.includes("rpg") || tagLower.includes("role")) return "bg-purple-500";
  if (tagLower.includes("mmo") || tagLower.includes("online")) return "bg-cyan-500";
  if (tagLower.includes("strategy") || tagLower.includes("rts")) return "bg-yellow-500";
  if (tagLower.includes("racing") || tagLower.includes("sports")) return "bg-emerald-500";
  if (tagLower.includes("horror") || tagLower.includes("survival")) return "bg-red-700";
  if (tagLower.includes("puzzle") || tagLower.includes("casual")) return "bg-pink-500";
  if (tagLower.includes("rare") || tagLower.includes("legendary")) return "bg-yellow-400";
  if (tagLower.includes("common") || tagLower.includes("basic")) return "bg-gray-400";
  if (tagLower.includes("premium") || tagLower.includes("exclusive")) return "bg-purple-600";
  const hash = tag.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const colors = [
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-cyan-400"
  ];
  return colors[hash % colors.length];
};
const capitalizeFirstLetter$4 = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const TagDots = ({
  tags,
  maxVisibleTags = 1,
  maxDots = 4
}) => {
  if (!tags || tags.length === 0) return null;
  const priorityTags = tags.filter((tag) => {
    const tagLower = tag.toLowerCase();
    return tagLower.includes("steam") || tagLower.includes("xbox") || tagLower.includes("playstation") || tagLower.includes("nintendo") || tagLower.includes("premium") || tagLower.includes("legendary") || tagLower.includes("rare") || tagLower.includes("exclusive");
  });
  const otherTags = tags.filter((tag) => !priorityTags.includes(tag));
  const sortedTags = [...priorityTags, ...otherTags];
  const primaryTag = sortedTags[0];
  const dotTags = sortedTags.slice(maxVisibleTags, maxVisibleTags + maxDots);
  const remainingCount = Math.max(0, tags.length - maxVisibleTags - maxDots);
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    primaryTag && /* @__PURE__ */ jsx(
      Badge,
      {
        variant: "secondary",
        className: "text-xs bg-gray-100 text-gray-700 border-gray-200 max-w-[100px] truncate hover:bg-gray-200 transition-colors",
        title: capitalizeFirstLetter$4(primaryTag),
        children: capitalizeFirstLetter$4(primaryTag)
      }
    ),
    dotTags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: dotTags.map((tag, index) => /* @__PURE__ */ jsxs(Tooltip, { delayDuration: 200, children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `
                      w-2 h-2 rounded-full cursor-help
                      transition-all duration-200 ease-out
                      hover:scale-125 hover:shadow-md
                      motion-reduce:hover:scale-100
                      ${getTagColor(tag)}
                    `,
          "aria-label": `Tag: ${capitalizeFirstLetter$4(tag)}`
        }
      ) }),
      /* @__PURE__ */ jsx(
        TooltipContent,
        {
          side: "top",
          className: "bg-gray-900 text-white border-gray-700 text-xs px-2 py-1",
          sideOffset: 5,
          children: capitalizeFirstLetter$4(tag)
        }
      )
    ] }, `${tag}-${index}`)) }),
    remainingCount > 0 && /* @__PURE__ */ jsxs(Tooltip, { delayDuration: 200, children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Badge,
        {
          variant: "outline",
          className: "text-xs bg-gray-50 text-gray-600 border-gray-300 px-1.5 py-0.5 cursor-help hover:bg-gray-100 transition-colors",
          "aria-label": `${remainingCount} more tags`,
          children: [
            "+",
            remainingCount
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        TooltipContent,
        {
          side: "top",
          className: "bg-gray-900 text-white border-gray-700 text-xs px-2 py-1 max-w-[200px]",
          sideOffset: 5,
          children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: tags.slice(maxVisibleTags + maxDots).map((tag, index) => /* @__PURE__ */ jsxs("span", { className: "text-gray-200", children: [
            capitalizeFirstLetter$4(tag),
            index < tags.slice(maxVisibleTags + maxDots).length - 1 ? "," : ""
          ] }, index)) })
        }
      )
    ] })
  ] }) });
};
const SORT_OPTIONS = [
  { value: "ev_desc", label: "Expected Value (High to Low)" },
  { value: "ev_asc", label: "Expected Value (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "volatility_desc", label: "Volatility (High to Low)" },
  { value: "volatility_asc", label: "Volatility (Low to High)" },
  { value: "floor_desc", label: "Floor Rate (High to Low)" },
  { value: "floor_asc", label: "Floor Rate (Low to High)" },
  { value: "name_asc", label: "Name (A to Z)" },
  { value: "name_desc", label: "Name (Z to A)" }
];
const PROVIDER_CONFIGS = {
  rillabox: {
    id: "rillabox",
    tableName: "rillabox_boxes",
    displayName: "RillaBox",
    color: "purple",
    gradient: "from-purple-600 to-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    logo: "/hub/images/998b5116-3761-4842-9a89-628f8e71c362.png",
    logoAspectRatio: "square",
    logoBackground: "white"
  },
  hypedrop: {
    id: "hypedrop",
    tableName: "hypedrop_boxes",
    displayName: "Hypedrop",
    color: "blue",
    gradient: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    logo: "/hub/images/df4efff1-2943-40f6-9a23-fc3f872ee338.png",
    logoAspectRatio: "wide",
    logoBackground: "transparent"
  },
  casesgg: {
    id: "casesgg",
    tableName: "casesgg_boxes",
    displayName: "Cases.GG",
    color: "green",
    gradient: "from-green-600 to-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    logo: "/hub/images/ccc8c7f7-53cc-41ac-8e6d-0fe13f968fd3.png",
    logoAspectRatio: "wide",
    logoBackground: "dark"
  },
  luxdrop: {
    id: "luxdrop",
    tableName: "luxdrop_boxes",
    displayName: "Luxdrop",
    color: "amber",
    gradient: "from-amber-600 to-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    logo: "/hub/images/f983540a-2e1c-47e7-bac5-99c00df75346.png",
    logoAspectRatio: "square",
    logoBackground: "transparent"
  }
};
const ProviderLogo = ({
  providerId,
  size = "md",
  className = "",
  showFallback = true,
  enhanced = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const config = PROVIDER_CONFIGS[providerId];
  if (!config) {
    console.warn(`Provider config not found for: ${providerId}`);
    return null;
  }
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    xxl: "w-20 h-20"
  };
  const containerClasses = {
    square: "aspect-square",
    wide: "aspect-[3/2]",
    tall: "aspect-[2/3]"
  };
  const backgroundClasses = {
    white: enhanced ? "bg-white shadow-md border border-gray-200" : "bg-white",
    transparent: enhanced ? "bg-gray-50/90 backdrop-blur-sm shadow-md border border-gray-200/70" : "bg-gray-50/60 border border-gray-200/40",
    dark: enhanced ? "bg-gray-900 shadow-md border border-gray-700" : "bg-gray-800 border border-gray-600"
  };
  const handleImageError = () => {
    console.warn(`Failed to load logo for ${config.displayName}: ${config.logo}`);
    setImageError(true);
  };
  const handleImageLoad = () => {
    console.log(`Successfully loaded logo for ${config.displayName}`);
    setImageLoaded(true);
  };
  const shouldShowFallback = imageError || !imageLoaded && showFallback;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `
        relative inline-flex items-center justify-center rounded-xl overflow-hidden
        ${sizeClasses[size]} 
        ${containerClasses[config.logoAspectRatio]} 
        ${backgroundClasses[config.logoBackground]}
        ${enhanced ? "ring-1 ring-black/10" : ""}
        ${className}
      `,
      children: [
        !imageError && /* @__PURE__ */ jsx(
          "img",
          {
            src: config.logo,
            alt: `${config.displayName} logo`,
            className: `
            w-full h-full object-contain transition-opacity duration-200
            ${enhanced ? "p-1.5" : "p-1"}
            ${imageLoaded ? "opacity-100" : "opacity-0"}
            ${config.logoBackground === "dark" ? "filter brightness-0 invert" : ""}
          `,
            onError: handleImageError,
            onLoad: handleImageLoad,
            loading: "lazy"
          }
        ),
        shouldShowFallback && /* @__PURE__ */ jsx(
          "div",
          {
            className: `
            ${imageError ? "flex" : imageLoaded ? "hidden" : "flex"}
            absolute inset-0 items-center justify-center font-bold
            ${config.logoBackground === "dark" ? "text-white" : config.textColor} 
            transition-opacity duration-200
          `,
            style: {
              fontSize: size === "xs" ? "6px" : size === "sm" ? "8px" : size === "md" ? "12px" : size === "lg" ? "16px" : size === "xl" ? "20px" : "24px"
            },
            children: config.displayName.charAt(0)
          }
        )
      ]
    }
  );
};
const useScrollState = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const handleScroll = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false);
  }, []);
  useEffect(() => {
    let scrollTimer;
    const throttledScrollHandler = () => {
      handleScroll();
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        handleScrollEnd();
      }, 150);
    };
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      clearTimeout(scrollTimer);
    };
  }, [handleScroll, handleScrollEnd]);
  return isScrolling;
};
const useMemoizedVolatilityColor = (volatilityPercent) => {
  return useMemo(() => {
    if (volatilityPercent >= 80) return "border-purple-600 bg-purple-50/80 text-purple-700";
    if (volatilityPercent >= 50) return "border-purple-500 bg-purple-50/60 text-purple-600";
    if (volatilityPercent >= 20) return "border-purple-400 bg-purple-50/40 text-purple-500";
    return "border-purple-300 bg-purple-50/20 text-purple-400";
  }, [volatilityPercent]);
};
const useMemoizedEVGradient = (ev) => {
  return useMemo(() => {
    if (ev > 100) return "text-green-600 font-bold";
    if (ev > 75) return "text-green-500 font-bold";
    if (ev > 50) return "text-orange-500 font-bold";
    return "text-red-600 font-bold";
  }, [ev]);
};
const useMemoizedFloorRateColor = (floorRate) => {
  return useMemo(() => {
    if (floorRate >= 80) return "text-green-600 font-bold";
    if (floorRate >= 60) return "text-green-500 font-bold";
    if (floorRate >= 40) return "text-orange-500 font-bold";
    if (floorRate >= 20) return "text-red-500 font-bold";
    return "text-red-600 font-bold";
  }, [floorRate]);
};
const formatPrice = (value) => {
  if (!value && value !== 0) return "$0.00";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue) || numValue < 0) return "$0.00";
  return `$${numValue.toFixed(2)}`;
};
const formatBoxPrice = (price) => {
  return formatPrice(price);
};
const formatCurrency = (value) => {
  if (!value && value !== 0) return "$0.00";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue) || numValue < 0) return "$0.00";
  if (numValue >= 1e3) {
    return `$${numValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
  return `$${numValue.toFixed(2)}`;
};
const formatCompactCurrency = (value) => {
  if (!value && value !== 0) return "$0.00";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue) || numValue < 0) return "$0.00";
  if (numValue >= 1e6) {
    return `$${(numValue / 1e6).toFixed(2)}M`;
  }
  if (numValue >= 1e3) {
    return `$${(numValue / 1e3).toFixed(2)}k`;
  }
  return `$${numValue.toFixed(2)}`;
};
const normalizeString = (str) => {
  if (!str) return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-");
};
const generateSlug = (boxName) => {
  if (!boxName) return "";
  let slug = normalizeString(boxName);
  const replacements = {
    "and": "n",
    "the": "",
    "box": "",
    "case": "",
    "mystery": "myst",
    "premium": "prem",
    "ultimate": "ult",
    "special": "spec",
    "limited": "ltd",
    "edition": "ed"
  };
  Object.entries(replacements).forEach(([word, replacement]) => {
    const regex = new RegExp(`\\b${word}\\b`, "g");
    slug = slug.replace(regex, replacement);
  });
  slug = slug.replace(/^-+|-+$/g, "").replace(/-+/g, "-");
  return slug || "unknown-box";
};
const calculateSimilarity = (str1, str2) => {
  if (!str1 || !str2) return 0;
  const normalize = (s) => normalizeString(s);
  const a = normalize(str1);
  const b = normalize(str2);
  if (a === b) return 1;
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        // deletion
        matrix[j - 1][i] + 1,
        // insertion
        matrix[j - 1][i - 1] + cost
        // substitution
      );
    }
  }
  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 1 : (maxLength - matrix[b.length][a.length]) / maxLength;
};
const findBestMatches = (searchSlug, boxNames) => {
  const results = [];
  boxNames.forEach((boxName, index) => {
    const boxSlug = generateSlug(boxName);
    let score = 0;
    if (boxSlug === searchSlug) {
      score = 1;
    } else if (boxSlug.includes(searchSlug) || searchSlug.includes(boxSlug)) {
      score = 0.8;
    } else {
      const nameScore = calculateSimilarity(searchSlug, boxSlug);
      const originalNameScore = calculateSimilarity(searchSlug, normalizeString(boxName));
      score = Math.max(nameScore, originalNameScore) * 0.6;
    }
    if (score > 0.3) {
      const lengthDiff = Math.abs(boxSlug.length - searchSlug.length);
      const lengthPenalty = Math.min(lengthDiff / Math.max(boxSlug.length, searchSlug.length), 0.3);
      score = Math.max(0, score - lengthPenalty);
    }
    if (score > 0.3) {
      results.push({
        originalName: boxName,
        slug: boxSlug,
        score,
        provider: ""
        // Will be set by caller
      });
    }
  });
  return results.sort((a, b) => b.score - a.score);
};
const BoxCard = React__default.memo(({ box, index, isVisible }) => {
  var _a2, _b2, _c, _d;
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const isScrolling = useScrollState();
  const volatilityPercent = box.standard_deviation_percent || 0;
  const volatilityColor = useMemoizedVolatilityColor(volatilityPercent);
  const evGradient = useMemoizedEVGradient(box.expected_value_percent_of_price);
  const floorRate = box.floor_rate_percent || 0;
  const floorRateColor = useMemoizedFloorRateColor(floorRate);
  const shouldAnimate = index < 12;
  const animationDelay = shouldAnimate ? Math.min(index * 0.05, 0.6) : 0;
  const boxSlug = generateSlug(box.box_name);
  const provider = box.provider || "rillabox";
  const handleClick = useCallback(() => {
    navigate(`/hub/box/${boxSlug}`);
  }, [navigate, boxSlug]);
  if (!isVisible) {
    return /* @__PURE__ */ jsx(SkeletonBoxCard, {});
  }
  return /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 300, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: shouldAnimate ? {
        duration: 0.4,
        delay: animationDelay,
        ease: "easeOut"
      } : { duration: 0 },
      className: "group",
      children: /* @__PURE__ */ jsxs(
        Card,
        {
          className: `
            cursor-pointer transition-all duration-300 ease-out
            border-2 backdrop-blur-sm h-full overflow-hidden 
            rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] 
            shimmer-card ${isScrolling ? "scroll-disabled" : ""} ${volatilityColor}
          `,
          onClick: handleClick,
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2 relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 z-10", children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  ProviderLogo,
                  {
                    providerId: provider,
                    size: "lg",
                    enhanced: true,
                    className: "hover:scale-[1.02] transition-transform duration-200"
                  }
                ) }) }),
                /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: ((_a2 = PROVIDER_CONFIGS[provider]) == null ? void 0 : _a2.displayName) || provider }) })
              ] }) }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "w-full h-40 rounded-lg mb-2 overflow-hidden p-2 border border-purple-200 backdrop-blur-sm relative",
                  style: {
                    backgroundImage: `url('/images/90a8beae-8a8c-4f9a-bfd2-d7dc5be9de82.png')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundBlendMode: "soft-light"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/70 backdrop-blur-[0.5px] rounded" }),
                    !imageLoaded && /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gray-200 animate-pulse rounded relative z-10" }),
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: box.box_image,
                        alt: box.box_name,
                        className: `w-full h-full object-contain transition-opacity duration-300 relative z-10 ${imageLoaded ? "opacity-100" : "opacity-0"}`,
                        loading: index < 12 ? "eager" : "lazy",
                        referrerPolicy: "no-referrer",
                        onLoad: () => setImageLoaded(true)
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-bold truncate text-gray-800 pr-16", children: box.box_name })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-left", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-800", children: formatBoxPrice(box.box_price) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium text-center ${(_b2 = PROVIDER_CONFIGS[provider]) == null ? void 0 : _b2.bgColor} ${(_c = PROVIDER_CONFIGS[provider]) == null ? void 0 : _c.textColor}`, children: (_d = PROVIDER_CONFIGS[provider]) == null ? void 0 : _d.displayName }) }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: `border-current font-bold text-sm ${volatilityColor}`, children: [
                  volatilityPercent.toFixed(1),
                  "%"
                ] }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: `text-3xl ${evGradient}`, children: [
                box.expected_value_percent_of_price.toFixed(1),
                "% EV"
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 font-medium", children: [
                "Floor: ",
                /* @__PURE__ */ jsxs("span", { className: floorRateColor, children: [
                  floorRate.toFixed(1),
                  "%"
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "min-h-[24px] flex items-center", children: /* @__PURE__ */ jsx(TagDots, { tags: box.tags, maxVisibleTags: 1, maxDots: 4 }) })
            ] })
          ]
        }
      )
    }
  ) });
});
BoxCard.displayName = "BoxCard";
const VirtualizedBoxGrid = ({
  boxes,
  itemsPerPage,
  currentPage
}) => {
  const [visibleBoxes, setVisibleBoxes] = useState(/* @__PURE__ */ new Set());
  const gridRef = useRef(null);
  const paginatedBoxes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return boxes.slice(startIndex, endIndex);
  }, [boxes, currentPage, itemsPerPage]);
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      const index = parseInt(entry.target.getAttribute("data-index") || "0");
      if (entry.isIntersecting) {
        setVisibleBoxes((prev) => /* @__PURE__ */ new Set([...prev, index]));
      }
    });
  }, []);
  React__default.useEffect(() => {
    var _a2;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1
    });
    const elements = (_a2 = gridRef.current) == null ? void 0 : _a2.querySelectorAll("[data-index]");
    elements == null ? void 0 : elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [observerCallback, paginatedBoxes]);
  React__default.useEffect(() => {
    const initialVisible = /* @__PURE__ */ new Set();
    for (let i = 0; i < Math.min(12, paginatedBoxes.length); i++) {
      initialVisible.add(i);
    }
    setVisibleBoxes(initialVisible);
  }, [paginatedBoxes]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: gridRef,
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px] px-2 md:px-0",
      children: paginatedBoxes.map((box, index) => /* @__PURE__ */ jsx("div", { "data-index": index, children: /* @__PURE__ */ jsx(
        BoxCard,
        {
          box,
          index,
          isVisible: visibleBoxes.has(index)
        }
      ) }, `${box.box_name}-${currentPage}-${index}`))
    }
  );
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(checkIsMobile());
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(checkIsMobile());
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems
}) => {
  const isMobile = useIsMobile();
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center text-gray-800 ${isMobile ? "flex-col space-y-4 px-4 py-6" : "flex-row gap-6 py-8"}`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-sm text-gray-600 font-medium ${isMobile ? "text-center" : ""}`, children: isMobile ? /* @__PURE__ */ jsxs("span", { children: [
      "Page ",
      currentPage,
      " of ",
      totalPages
    ] }) : /* @__PURE__ */ jsxs("span", { children: [
      "Showing ",
      startIndex,
      "-",
      endIndex,
      " of ",
      totalItems,
      " mystery boxes"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `flex items-center ${isMobile ? "gap-3" : "gap-4"}`, children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: isMobile ? "default" : "sm",
          onClick: () => onPageChange(Math.max(1, currentPage - 1)),
          disabled: currentPage === 1,
          className: `bg-white border-gray-300 text-gray-800 hover:bg-gray-50 disabled:opacity-50 ${isMobile ? "min-h-[44px] px-4" : ""}`,
          children: [
            /* @__PURE__ */ jsx(ChevronLeft, { className: `${isMobile ? "h-5 w-5" : "h-4 w-4"}` }),
            !isMobile && /* @__PURE__ */ jsx("span", { className: "ml-1", children: "Previous" })
          ]
        }
      ),
      !isMobile && /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-800 border border-gray-300", children: [
        "Page ",
        currentPage,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: isMobile ? "default" : "sm",
          onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)),
          disabled: currentPage === totalPages,
          className: `bg-white border-gray-300 text-gray-800 hover:bg-gray-50 disabled:opacity-50 ${isMobile ? "min-h-[44px] px-4" : ""}`,
          children: [
            !isMobile && /* @__PURE__ */ jsx("span", { className: "mr-1", children: "Next" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: `${isMobile ? "h-5 w-5" : "h-4 w-4"}` })
          ]
        }
      )
    ] })
  ] });
};
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const SortDropdown = ({ value, onChange }) => {
  const isMobile = useIsMobile();
  const currentSort = SORT_OPTIONS.find((option) => option.value === value);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        className: `bg-white/60 border-purple-300 text-gray-800 transition-all duration-300 hover:bg-white hover:border-purple-400 focus:border-purple-400 focus:ring-purple-400 ${isMobile ? "w-full min-h-[48px] justify-between" : ""}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ArrowUpDown, { className: `${isMobile ? "h-5 w-5 mr-2" : "h-4 w-4 mr-2"}` }),
            /* @__PURE__ */ jsx("span", { className: isMobile ? "truncate" : "", children: isMobile ? (currentSort == null ? void 0 : currentSort.label.split(" ")[0]) || "Sort" : (currentSort == null ? void 0 : currentSort.label) || "Sort by" })
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `${isMobile ? "h-5 w-5 ml-2 flex-shrink-0" : "h-4 w-4 ml-2"}` })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      DropdownMenuContent,
      {
        className: "bg-white border-purple-200 shadow-xl z-50",
        style: {
          minWidth: isMobile ? "200px" : "56px",
          backgroundColor: "white",
          zIndex: 50
        },
        children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsx(
          DropdownMenuItem,
          {
            onClick: () => onChange(option.value),
            className: `cursor-pointer ${value === option.value ? "bg-purple-50 text-purple-700 font-medium" : ""} ${isMobile ? "min-h-[44px] text-base" : ""}`,
            children: option.label
          },
          option.value
        ))
      }
    )
  ] });
};
const ScrollableContainer = ({
  children,
  className,
  maxHeight = "max-h-60",
  showIndicators = true
}) => {
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);
  const scrollRef = useRef(null);
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowTopGradient(scrollTop > 10);
    setShowBottomGradient(scrollTop < scrollHeight - clientHeight - 10);
  };
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    checkScrollPosition();
    scrollElement.addEventListener("scroll", checkScrollPosition);
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(scrollElement);
    return () => {
      scrollElement.removeEventListener("scroll", checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    showIndicators && showTopGradient && /* @__PURE__ */ jsx("div", { className: "scroll-indicator-top opacity-100" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: cn(
          "overflow-y-auto overflow-x-visible scrollbar-webkit px-2",
          maxHeight,
          className
        ),
        style: {
          overflowClipMargin: "64px"
        },
        children
      }
    ),
    showIndicators && showBottomGradient && /* @__PURE__ */ jsx("div", { className: "scroll-indicator-bottom opacity-100" })
  ] });
};
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /* @__PURE__ */ jsx(
  Drawer$1.Root,
  {
    shouldScaleBackground,
    ...props
  }
);
Drawer.displayName = "Drawer";
const DrawerTrigger = Drawer$1.Trigger;
const DrawerPortal = Drawer$1.Portal;
Drawer$1.Close;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer$1.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  }
));
DrawerOverlay.displayName = Drawer$1.Overlay.displayName;
const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DrawerPortal, { children: [
  /* @__PURE__ */ jsx(DrawerOverlay, {}),
  /* @__PURE__ */ jsxs(
    Drawer$1.Content,
    {
      ref,
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
    ...props
  }
);
DrawerHeader.displayName = "DrawerHeader";
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer$1.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DrawerTitle.displayName = Drawer$1.Title.displayName;
const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer$1.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = Drawer$1.Description.displayName;
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const CategoryFilter = ({
  selectedCategories,
  availableCategories,
  onCategoryChange
}) => {
  const [isOpen, setIsOpen] = React__default.useState(true);
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };
  const handleSelectAll = () => {
    onCategoryChange(availableCategories);
  };
  const handleClearAll = () => {
    onCategoryChange([]);
  };
  return /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: "Categories" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        selectedCategories.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full", children: selectedCategories.length }),
        isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "mt-3 space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleSelectAll,
            className: "text-xs",
            children: "Select All"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleClearAll,
            className: "text-xs",
            children: "Clear All"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ScrollableContainer, { maxHeight: "max-h-40", className: "grid grid-cols-1 gap-2", showIndicators: true, children: availableCategories.map((category) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded",
          children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: selectedCategories.includes(category),
                onCheckedChange: () => handleCategoryToggle(category)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: category })
          ]
        },
        category
      )) })
    ] })
  ] });
};
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex w-full touch-none select-none items-center",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
const RangeFilter = ({
  title,
  min,
  max,
  value,
  onChange,
  formatLabel = (v) => v.toString(),
  presetButtons = [],
  step = 1
}) => {
  const [isOpen, setIsOpen] = React__default.useState(true);
  const [localMin, setLocalMin] = React__default.useState(value.min.toString());
  const [localMax, setLocalMax] = React__default.useState(value.max.toString());
  React__default.useEffect(() => {
    setLocalMin(value.min.toString());
    setLocalMax(value.max.toString());
  }, [value]);
  const handleSliderChange = (newValue) => {
    const adjustedMin = Math.max(min, newValue[0]);
    const adjustedMax = Math.max(min, newValue[1]);
    onChange({ min: adjustedMin, max: adjustedMax });
  };
  const handleMinInputChange = (e) => {
    setLocalMin(e.target.value);
  };
  const handleMaxInputChange = (e) => {
    setLocalMax(e.target.value);
  };
  const handleInputBlur = () => {
    const minVal = Math.max(min, Math.min(parseFloat(localMin) || min, max));
    const maxVal = Math.min(max, Math.max(parseFloat(localMax) || max, min));
    const finalMax = Math.max(minVal, maxVal);
    onChange({ min: minVal, max: finalMax });
  };
  const isActive = value.min !== min || value.max !== max;
  return /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        isActive && /* @__PURE__ */ jsxs("span", { className: "text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full", children: [
          formatLabel(value.min),
          " - ",
          formatLabel(value.max)
        ] }),
        isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "mt-3 space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "px-2", children: /* @__PURE__ */ jsx(
        Slider,
        {
          value: [value.min, value.max],
          onValueChange: handleSliderChange,
          min,
          max,
          step,
          className: "w-full"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-600 mb-1 block", children: "Min" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              value: localMin,
              onChange: handleMinInputChange,
              onBlur: handleInputBlur,
              className: "text-sm",
              min
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-600 mb-1 block", children: "Max" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              value: localMax,
              onChange: handleMaxInputChange,
              onBlur: handleInputBlur,
              className: "text-sm",
              min
            }
          )
        ] })
      ] }),
      presetButtons.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: presetButtons.map((preset, index) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: preset.action,
          className: "text-xs",
          children: preset.label
        },
        index
      )) })
    ] })
  ] });
};
const MobileRangeFilter = ({
  title,
  min,
  max,
  value,
  onChange,
  formatLabel = (v) => v.toString(),
  presetButtons = [],
  step = 1
}) => {
  const [isOpen, setIsOpen] = React__default.useState(true);
  const [localMin, setLocalMin] = React__default.useState(value.min.toString());
  const [localMax, setLocalMax] = React__default.useState(value.max.toString());
  React__default.useEffect(() => {
    setLocalMin(value.min.toString());
    setLocalMax(value.max.toString());
  }, [value]);
  const handleSliderChange = (newValue) => {
    const adjustedMin = Math.max(min, newValue[0]);
    const adjustedMax = Math.max(min, newValue[1]);
    onChange({ min: adjustedMin, max: adjustedMax });
  };
  const handleMinInputChange = (e) => {
    setLocalMin(e.target.value);
  };
  const handleMaxInputChange = (e) => {
    setLocalMax(e.target.value);
  };
  const handleInputBlur = () => {
    const minVal = Math.max(min, Math.min(parseFloat(localMin) || min, max));
    const maxVal = Math.min(max, Math.max(parseFloat(localMax) || max, min));
    const finalMax = Math.max(minVal, maxVal);
    onChange({ min: minVal, max: finalMax });
  };
  const isActive = value.min !== min || value.max !== max;
  return /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors min-h-[56px]", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 text-lg", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        isActive && /* @__PURE__ */ jsxs("span", { className: "text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full", children: [
          formatLabel(value.min),
          " - ",
          formatLabel(value.max)
        ] }),
        isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "mt-4 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-lg font-semibold text-purple-600", children: [
          formatLabel(value.min),
          " - ",
          formatLabel(value.max)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
          "Range: ",
          formatLabel(min),
          " to ",
          formatLabel(max)
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-2 py-4", children: /* @__PURE__ */ jsx(
        Slider,
        {
          value: [value.min, value.max],
          onValueChange: handleSliderChange,
          min,
          max,
          step,
          className: "w-full [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_.slider-track]:h-3"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-600 mb-2 block font-medium", children: "Minimum" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              inputMode: "numeric",
              value: localMin,
              onChange: handleMinInputChange,
              onBlur: handleInputBlur,
              className: "text-lg text-center min-h-[48px]",
              placeholder: min.toString(),
              min
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-600 mb-2 block font-medium", children: "Maximum" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              inputMode: "numeric",
              value: localMax,
              onChange: handleMaxInputChange,
              onBlur: handleInputBlur,
              className: "text-lg text-center min-h-[48px]",
              placeholder: max.toString(),
              min
            }
          )
        ] })
      ] }),
      presetButtons.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: presetButtons.map((preset, index) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "lg",
          onClick: preset.action,
          className: "text-sm font-medium min-h-[48px] justify-center",
          children: preset.label
        },
        index
      )) })
    ] })
  ] });
};
const VolatilityFilter = ({
  selectedBuckets,
  onBucketsChange,
  percentageRange,
  onPercentageRangeChange
}) => {
  const [isOpen, setIsOpen] = React__default.useState(true);
  const buckets = ["Low", "Medium", "High"];
  const handleBucketToggle = (bucket) => {
    if (selectedBuckets.includes(bucket)) {
      onBucketsChange(selectedBuckets.filter((b) => b !== bucket));
    } else {
      onBucketsChange([...selectedBuckets, bucket]);
    }
  };
  const isRangeActive = percentageRange.min !== 0 || percentageRange.max !== 100;
  const isActive = selectedBuckets.length > 0 || isRangeActive;
  return /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: "Volatility" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        isActive && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full", children: selectedBuckets.length > 0 ? `${selectedBuckets.length} bucket${selectedBuckets.length > 1 ? "s" : ""}` : "Range" }),
        isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "mt-3 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Volatility Level" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: buckets.map((bucket) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: `flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors ${selectedBuckets.includes(bucket) ? "bg-purple-50 border border-purple-200" : ""}`,
            children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  checked: selectedBuckets.includes(bucket),
                  onCheckedChange: () => handleBucketToggle(bucket)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: bucket })
            ]
          },
          bucket
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Exact Percentage Range" }),
        /* @__PURE__ */ jsx(
          RangeFilter,
          {
            title: "",
            min: 0,
            max: 100,
            value: percentageRange,
            onChange: onPercentageRangeChange,
            formatLabel: (v) => `${v}%`,
            step: 1,
            presetButtons: [
              {
                label: "Low Risk (0-30%)",
                action: () => onPercentageRangeChange({ min: 0, max: 30 })
              },
              {
                label: "Medium Risk (30-60%)",
                action: () => onPercentageRangeChange({ min: 30, max: 60 })
              },
              {
                label: "High Risk (60%+)",
                action: () => onPercentageRangeChange({ min: 60, max: 100 })
              }
            ]
          }
        )
      ] })
    ] })
  ] });
};
const capitalizeFirstLetter$3 = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const TagsFilter = ({
  selectedTags,
  availableTags,
  onTagsChange
}) => {
  const [isOpen, setIsOpen] = React__default.useState(true);
  const [searchTerm, setSearchTerm] = React__default.useState("");
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };
  const filteredTags = availableTags.filter(
    (tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const popularTags = availableTags.slice(0, 6);
  return /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: "Tags" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        selectedTags.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full", children: selectedTags.length }),
        isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "mt-3 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Search tags...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "pl-10 text-sm"
          }
        )
      ] }),
      searchTerm === "" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Popular Tags" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: popularTags.map((tag) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: "flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded text-sm",
            children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  checked: selectedTags.includes(tag),
                  onCheckedChange: () => handleTagToggle(tag)
                }
              ),
              /* @__PURE__ */ jsx("span", { children: capitalizeFirstLetter$3(tag) })
            ]
          },
          tag
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: searchTerm ? "Search Results" : "All Tags" }),
        /* @__PURE__ */ jsx(ScrollableContainer, { maxHeight: "max-h-40", className: "grid grid-cols-1 gap-1", showIndicators: true, children: filteredTags.map((tag) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: "flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded",
            children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  checked: selectedTags.includes(tag),
                  onCheckedChange: () => handleTagToggle(tag)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: capitalizeFirstLetter$3(tag) })
            ]
          },
          tag
        )) })
      ] })
    ] })
  ] });
};
const AdvancedFilters = ({
  jackpotValueRange,
  onJackpotValueRangeChange,
  itemCountRange,
  onItemCountRangeChange,
  maxJackpotValue,
  maxItemCount
}) => {
  const [isOpen, setIsOpen] = React__default.useState(false);
  jackpotValueRange.min !== 0 || jackpotValueRange.max !== maxJackpotValue || itemCountRange.min !== 0 || itemCountRange.max !== maxItemCount;
  return /* @__PURE__ */ jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: "Advanced Filters" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "mt-3 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Jackpot Item Value Range" }),
        /* @__PURE__ */ jsx(
          RangeFilter,
          {
            title: "",
            min: 0,
            max: maxJackpotValue,
            value: jackpotValueRange,
            onChange: onJackpotValueRangeChange,
            formatLabel: (v) => `$${v.toLocaleString()}`,
            step: 10,
            presetButtons: [
              {
                label: "High Value >$1000",
                action: () => onJackpotValueRangeChange({
                  min: 1e3,
                  max: maxJackpotValue
                })
              },
              {
                label: "Premium >$5000",
                action: () => onJackpotValueRangeChange({
                  min: 5e3,
                  max: maxJackpotValue
                })
              }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Total Item Count" }),
        /* @__PURE__ */ jsx(
          RangeFilter,
          {
            title: "",
            min: 0,
            max: maxItemCount,
            value: itemCountRange,
            onChange: onItemCountRangeChange,
            formatLabel: (v) => `${v} items`,
            step: 1,
            presetButtons: [
              {
                label: "Large Boxes >50",
                action: () => onItemCountRangeChange({
                  min: 50,
                  max: maxItemCount
                })
              },
              {
                label: "Mega Boxes >100",
                action: () => onItemCountRangeChange({
                  min: 100,
                  max: maxItemCount
                })
              }
            ]
          }
        )
      ] })
    ] })
  ] });
};
const ProviderFilter = ({
  selectedProviders,
  onProviderChange,
  providerCounts = {}
}) => {
  const handleProviderToggle = (providerId, checked) => {
    if (checked) {
      onProviderChange([...selectedProviders, providerId]);
    } else {
      onProviderChange(selectedProviders.filter((p) => p !== providerId));
    }
  };
  const handleSelectAll = () => {
    const allProviders2 = Object.keys(PROVIDER_CONFIGS);
    onProviderChange(selectedProviders.length === allProviders2.length ? [] : allProviders2);
  };
  const allProviders = Object.keys(PROVIDER_CONFIGS);
  const isAllSelected = selectedProviders.length === allProviders.length;
  const isPartialSelection = selectedProviders.length > 0 && selectedProviders.length < allProviders.length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900", children: "Mystery Box Providers" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSelectAll,
          className: "text-xs text-purple-600 hover:text-purple-800 font-medium",
          children: isAllSelected ? "Clear All" : "Select All"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(PROVIDER_CONFIGS).map(([providerId, config]) => {
      const isSelected = selectedProviders.includes(providerId);
      const count2 = providerCounts[providerId] || 0;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            id: `provider-${providerId}`,
            checked: isSelected,
            onCheckedChange: (checked) => handleProviderToggle(providerId, checked),
            className: "data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
          }
        ),
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: `provider-${providerId}`,
            className: "flex-1 cursor-pointer flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsx(
                  ProviderLogo,
                  {
                    providerId,
                    size: "lg",
                    enhanced: true,
                    className: "transition-transform hover:scale-110"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-800", children: config.displayName }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Mystery Box Provider" })
                ] })
              ] }),
              count2 > 0 && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: `${config.bgColor} ${config.textColor} text-xs font-medium`, children: count2.toLocaleString() })
            ]
          }
        )
      ] }, providerId);
    }) }),
    isPartialSelection && /* @__PURE__ */ jsx("div", { className: "pt-3 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 text-center", children: [
      selectedProviders.length,
      " of ",
      allProviders.length,
      " providers selected"
    ] }) })
  ] });
};
const FilterPanel = ({
  isOpen,
  onOpenChange,
  filters,
  onFiltersChange,
  boxesData,
  activeFiltersCount
}) => {
  const { toast: toast2 } = useToast();
  const isMobile = useIsMobile();
  const initialFilters = useMemo(() => {
    if (!boxesData || boxesData.length === 0) {
      return {
        categories: [],
        providers: [],
        // Add providers property
        priceRange: { min: 0, max: 1e3 },
        expectedValueRange: { min: 0, max: 200 },
        // EV should never be negative
        volatilityBuckets: [],
        volatilityRange: { min: 0, max: 100 },
        floorRateRange: { min: 0, max: 100 },
        tags: [],
        advanced: {
          jackpotValueRange: { min: 0, max: 1e4 },
          itemCountRange: { min: 0, max: 100 }
        }
      };
    }
    const validPrices = boxesData.map((box) => Number(box == null ? void 0 : box.box_price)).filter((p) => !isNaN(p) && p > 0);
    const validEvs = boxesData.map((box) => Number(box == null ? void 0 : box.expected_value_percent_of_price)).filter((v) => !isNaN(v) && v >= 0);
    const validFloors = boxesData.map((box) => Number(box == null ? void 0 : box.floor_rate_percent)).filter((v) => !isNaN(v) && v >= 0);
    const validVolatilities = boxesData.map((box) => Number(box == null ? void 0 : box.standard_deviation_percent)).filter((v) => !isNaN(v) && v >= 0);
    return {
      categories: [],
      providers: [],
      // Add providers property
      priceRange: {
        min: validPrices.length > 0 ? Math.floor(Math.min(...validPrices)) : 0,
        max: validPrices.length > 0 ? Math.ceil(Math.max(...validPrices)) : 1e3
      },
      expectedValueRange: {
        min: 0,
        // Always start EV from 0, never negative
        max: validEvs.length > 0 ? Math.ceil(Math.max(...validEvs)) : 200
      },
      volatilityBuckets: [],
      volatilityRange: {
        min: 0,
        max: validVolatilities.length > 0 ? Math.ceil(Math.max(...validVolatilities)) : 100
      },
      floorRateRange: {
        min: validFloors.length > 0 ? Math.floor(Math.min(...validFloors)) : 0,
        max: validFloors.length > 0 ? Math.ceil(Math.max(...validFloors)) : 100
      },
      tags: [],
      advanced: {
        jackpotValueRange: { min: 0, max: 1e4 },
        itemCountRange: { min: 0, max: 100 }
      }
    };
  }, [boxesData]);
  const {
    availableCategories,
    availableTags,
    priceRange,
    evRange,
    floorRange,
    jackpotRange,
    itemCountRange
  } = useMemo(() => {
    const categories = [...new Set(boxesData.map((box) => box.category).filter(Boolean))];
    const tags = [...new Set(boxesData.flatMap((box) => box.tags))];
    const prices = boxesData.map((box) => box.box_price).filter(Boolean);
    const evs = boxesData.map((box) => box.expected_value_percent_of_price).filter((v) => v !== null && v !== void 0 && v >= 0);
    const floors = boxesData.map((box) => box.floor_rate_percent).filter(Boolean);
    const jackpotValues = boxesData.flatMap(
      (box) => {
        var _a2;
        return ((_a2 = box.jackpot_items) == null ? void 0 : _a2.map((item) => item.value || 0)) || [];
      }
    ).filter((val) => val > 0);
    const itemCounts = boxesData.map(
      (box) => {
        var _a2;
        return ((_a2 = box.all_items) == null ? void 0 : _a2.length) || 0;
      }
    ).filter((count2) => count2 > 0);
    return {
      availableCategories: categories,
      availableTags: tags,
      priceRange: {
        min: Math.floor(Math.min(...prices, 0)),
        max: Math.ceil(Math.max(...prices, 1e3))
      },
      evRange: {
        min: 0,
        // Always start from 0, never negative
        max: Math.ceil(Math.max(...evs, 200))
      },
      floorRange: {
        min: Math.floor(Math.min(...floors, 0)),
        max: Math.ceil(Math.max(...floors, 100))
      },
      jackpotRange: {
        min: 0,
        max: Math.ceil(Math.max(...jackpotValues, 1e4))
      },
      itemCountRange: {
        min: 0,
        max: Math.ceil(Math.max(...itemCounts, 100))
      }
    };
  }, [boxesData]);
  const providerCounts = useMemo(() => {
    const counts = {};
    boxesData.forEach((box) => {
      if (box == null ? void 0 : box.provider) {
        counts[box.provider] = (counts[box.provider] || 0) + 1;
      }
    });
    return counts;
  }, [boxesData]);
  const clearAllFilters = () => {
    onFiltersChange(initialFilters);
    toast2({
      title: "All filters cleared",
      description: "All filters have been reset to default values."
    });
  };
  const updateFilters = (updates) => {
    console.log("FilterPanel updateFilters called with:", updates);
    const newFilters = { ...filters, ...updates };
    console.log("New filters state:", newFilters);
    onFiltersChange(newFilters);
  };
  const updateAdvancedFilters = (updates) => {
    onFiltersChange({
      ...filters,
      advanced: { ...filters.advanced, ...updates }
    });
  };
  const TriggerButton = /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      className: "bg-white/60 border-purple-300 text-gray-800 transition-all duration-300 hover:bg-white hover:border-purple-400 focus:border-purple-400 focus:ring-purple-400 relative",
      children: [
        /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4 mr-2" }),
        "Filters",
        activeFiltersCount > 0 && /* @__PURE__ */ jsx("span", { className: "ml-2 px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full animate-pulse", children: activeFiltersCount })
      ]
    }
  );
  const FilterContent = /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      ProviderFilter,
      {
        selectedProviders: filters.providers,
        onProviderChange: (providers) => updateFilters({ providers }),
        providerCounts
      }
    ),
    /* @__PURE__ */ jsx(
      CategoryFilter,
      {
        selectedCategories: filters.categories,
        availableCategories,
        onCategoryChange: (categories) => updateFilters({ categories })
      }
    ),
    /* @__PURE__ */ jsx(
      RangeFilter,
      {
        title: "Price Range",
        min: priceRange.min,
        max: priceRange.max,
        value: filters.priceRange,
        onChange: (priceRange2) => updateFilters({ priceRange: priceRange2 }),
        formatLabel: (v) => `$${v.toFixed(2)}`,
        step: 0.01
      }
    ),
    isMobile ? /* @__PURE__ */ jsx(
      MobileRangeFilter,
      {
        title: "Expected Value",
        min: evRange.min,
        max: evRange.max,
        value: filters.expectedValueRange,
        onChange: (expectedValueRange) => updateFilters({ expectedValueRange }),
        formatLabel: (v) => `${v.toFixed(1)}%`,
        step: 0.1,
        presetButtons: [
          {
            label: "High Value >50%",
            action: () => updateFilters({
              expectedValueRange: { min: 50, max: evRange.max }
            })
          },
          {
            label: "Premium >100%",
            action: () => updateFilters({
              expectedValueRange: { min: 100, max: evRange.max }
            })
          }
        ]
      }
    ) : /* @__PURE__ */ jsx(
      RangeFilter,
      {
        title: "Expected Value",
        min: evRange.min,
        max: evRange.max,
        value: filters.expectedValueRange,
        onChange: (expectedValueRange) => updateFilters({ expectedValueRange }),
        formatLabel: (v) => `${v.toFixed(1)}%`,
        step: 0.1,
        presetButtons: [
          {
            label: "High Value >50%",
            action: () => updateFilters({
              expectedValueRange: { min: 50, max: evRange.max }
            })
          },
          {
            label: "Premium >100%",
            action: () => updateFilters({
              expectedValueRange: { min: 100, max: evRange.max }
            })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      VolatilityFilter,
      {
        selectedBuckets: filters.volatilityBuckets,
        onBucketsChange: (volatilityBuckets) => updateFilters({ volatilityBuckets }),
        percentageRange: filters.volatilityRange,
        onPercentageRangeChange: (volatilityRange) => updateFilters({ volatilityRange })
      }
    ),
    /* @__PURE__ */ jsx(
      RangeFilter,
      {
        title: "Floor Rate",
        min: floorRange.min,
        max: floorRange.max,
        value: filters.floorRateRange,
        onChange: (floorRateRange) => updateFilters({ floorRateRange }),
        formatLabel: (v) => `${v.toFixed(1)}%`,
        step: 0.1,
        presetButtons: [
          {
            label: "High Floor >80%",
            action: () => updateFilters({
              floorRateRange: { min: 80, max: floorRange.max }
            })
          },
          {
            label: "Safe Bets >90%",
            action: () => updateFilters({
              floorRateRange: { min: 90, max: floorRange.max }
            })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      TagsFilter,
      {
        selectedTags: filters.tags,
        availableTags,
        onTagsChange: (tags) => updateFilters({ tags })
      }
    ),
    /* @__PURE__ */ jsx(
      AdvancedFilters,
      {
        jackpotValueRange: filters.advanced.jackpotValueRange,
        onJackpotValueRangeChange: (jackpotValueRange) => updateAdvancedFilters({ jackpotValueRange }),
        itemCountRange: filters.advanced.itemCountRange,
        onItemCountRangeChange: (itemCountRange2) => updateAdvancedFilters({ itemCountRange: itemCountRange2 }),
        maxJackpotValue: jackpotRange.max,
        maxItemCount: itemCountRange.max
      }
    )
  ] });
  if (isMobile) {
    return /* @__PURE__ */ jsxs(Drawer, { open: isOpen, onOpenChange, children: [
      /* @__PURE__ */ jsx(DrawerTrigger, { asChild: true, children: TriggerButton }),
      /* @__PURE__ */ jsxs(DrawerContent, { className: "max-h-[85vh]", children: [
        /* @__PURE__ */ jsx(DrawerHeader, { className: "pb-4 border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(DrawerTitle, { className: "text-xl font-semibold text-gray-900", children: "Filter & Search" }),
            /* @__PURE__ */ jsx(DrawerDescription, { className: "text-gray-600", children: "Refine your search with filtering options" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            activeFiltersCount > 0 && /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: clearAllFilters,
                className: "text-gray-500 hover:text-gray-700 hover:bg-red-50 transition-colors min-h-[44px]",
                children: [
                  /* @__PURE__ */ jsx(RotateCcw, { className: "h-5 w-5 mr-1" }),
                  "Clear All"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => onOpenChange(false),
                className: "text-gray-500 hover:text-gray-700 min-h-[44px] min-w-[44px]",
                children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          ScrollableContainer,
          {
            maxHeight: "max-h-[calc(85vh-12rem)]",
            className: "px-4 pb-6",
            showIndicators: true,
            children: /* @__PURE__ */ jsx("div", { className: "space-y-6 pt-4", children: FilterContent })
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Sheet, { open: isOpen, onOpenChange, children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: TriggerButton }),
    /* @__PURE__ */ jsx(SheetContent, { className: "w-[400px] sm:w-[540px]", children: /* @__PURE__ */ jsxs(
      ScrollableContainer,
      {
        maxHeight: "h-full",
        className: "pb-6",
        showIndicators: true,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "pb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(SheetTitle, { className: "text-xl font-semibold text-gray-900", children: "Filter & Search" }),
              activeFiltersCount > 0 && /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: clearAllFilters,
                  className: "text-gray-500 hover:text-gray-700 hover:bg-red-50 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4 mr-1" }),
                    "Clear All"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx(SheetDescription, { className: "text-gray-600", children: "Refine your search with advanced filtering options" })
          ] }),
          FilterContent
        ]
      }
    ) })
  ] });
};
const capitalizeFirstLetter$2 = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const MobileFilterChips = ({
  filters,
  onRemoveFilter,
  initialFilters
}) => {
  const chips = [];
  filters.providers.forEach((providerId) => {
    const config = PROVIDER_CONFIGS[providerId];
    if (config) {
      chips.push({
        type: "provider",
        label: config.displayName,
        value: providerId,
        providerId
      });
    }
  });
  filters.categories.forEach((category) => {
    chips.push({
      type: "category",
      label: capitalizeFirstLetter$2(category),
      value: category
    });
  });
  filters.tags.forEach((tag) => {
    chips.push({
      type: "tag",
      label: `#${capitalizeFirstLetter$2(tag)}`,
      value: tag
    });
  });
  filters.volatilityBuckets.forEach((bucket) => {
    chips.push({
      type: "volatilityBucket",
      label: `${bucket} Vol.`,
      value: bucket
    });
  });
  if (filters.priceRange.min !== initialFilters.priceRange.min || filters.priceRange.max !== initialFilters.priceRange.max) {
    chips.push({
      type: "priceRange",
      label: `$${filters.priceRange.min}-$${filters.priceRange.max}`
    });
  }
  if (filters.expectedValueRange.min !== initialFilters.expectedValueRange.min || filters.expectedValueRange.max !== initialFilters.expectedValueRange.max) {
    chips.push({
      type: "expectedValueRange",
      label: `EV: ${filters.expectedValueRange.min}%-${filters.expectedValueRange.max}%`
    });
  }
  if (filters.volatilityRange.min !== 0 || filters.volatilityRange.max !== initialFilters.volatilityRange.max) {
    chips.push({
      type: "volatilityRange",
      label: `Vol: ${filters.volatilityRange.min}%-${filters.volatilityRange.max}%`
    });
  }
  if (filters.floorRateRange.min !== initialFilters.floorRateRange.min || filters.floorRateRange.max !== initialFilters.floorRateRange.max) {
    chips.push({
      type: "floorRateRange",
      label: `Floor: ${filters.floorRateRange.min}%-${filters.floorRateRange.max}%`
    });
  }
  if (filters.advanced.jackpotValueRange.min !== 0 || filters.advanced.jackpotValueRange.max !== initialFilters.advanced.jackpotValueRange.max) {
    chips.push({
      type: "jackpotValueRange",
      label: `Jackpot: $${filters.advanced.jackpotValueRange.min.toLocaleString()}-$${filters.advanced.jackpotValueRange.max.toLocaleString()}`
    });
  }
  if (filters.advanced.itemCountRange.min !== 0 || filters.advanced.itemCountRange.max !== initialFilters.advanced.itemCountRange.max) {
    chips.push({
      type: "itemCountRange",
      label: `Items: ${filters.advanced.itemCountRange.min}-${filters.advanced.itemCountRange.max}`
    });
  }
  if (chips.length === 0) return null;
  const handleRemoveFilter = (type, value) => {
    onRemoveFilter(type, value);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 px-1", children: chips.map((chip, index) => /* @__PURE__ */ jsxs(
    Badge,
    {
      variant: "secondary",
      className: "bg-purple-100 text-purple-700 hover:bg-purple-200 pr-1 py-2 text-sm min-h-[36px] flex items-center",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          chip.providerId && /* @__PURE__ */ jsx(
            ProviderLogo,
            {
              providerId: chip.providerId,
              size: "sm",
              enhanced: true,
              className: "flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px]", children: chip.label })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-6 w-6 p-0 ml-2 hover:bg-purple-300 rounded-full min-w-[24px] flex-shrink-0",
            onClick: () => handleRemoveFilter(chip.type, chip.value),
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        )
      ]
    },
    `${chip.type}-${chip.value || index}`
  )) });
};
const capitalizeFirstLetter$1 = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const FilterChips = ({
  filters,
  onRemoveFilter,
  initialFilters
}) => {
  const chips = [];
  filters.categories.forEach((category) => {
    chips.push({
      type: "category",
      label: capitalizeFirstLetter$1(category),
      value: category
    });
  });
  filters.tags.forEach((tag) => {
    chips.push({
      type: "tag",
      label: `#${capitalizeFirstLetter$1(tag)}`,
      value: tag
    });
  });
  filters.volatilityBuckets.forEach((bucket) => {
    chips.push({
      type: "volatilityBucket",
      label: `${bucket} Volatility`,
      value: bucket
    });
  });
  if (filters.priceRange.min !== initialFilters.priceRange.min || filters.priceRange.max !== initialFilters.priceRange.max) {
    chips.push({
      type: "priceRange",
      label: `Price: $${filters.priceRange.min}-$${filters.priceRange.max}`
    });
  }
  if (filters.expectedValueRange.min !== initialFilters.expectedValueRange.min || filters.expectedValueRange.max !== initialFilters.expectedValueRange.max) {
    chips.push({
      type: "expectedValueRange",
      label: `EV: ${filters.expectedValueRange.min}%-${filters.expectedValueRange.max}%`
    });
  }
  if (filters.volatilityRange.min !== 0 || filters.volatilityRange.max !== initialFilters.volatilityRange.max) {
    chips.push({
      type: "volatilityRange",
      label: `Volatility: ${filters.volatilityRange.min}%-${filters.volatilityRange.max}%`
    });
  }
  if (filters.floorRateRange.min !== initialFilters.floorRateRange.min || filters.floorRateRange.max !== initialFilters.floorRateRange.max) {
    chips.push({
      type: "floorRateRange",
      label: `Floor: ${filters.floorRateRange.min}%-${filters.floorRateRange.max}%`
    });
  }
  if (filters.advanced.jackpotValueRange.min !== 0 || filters.advanced.jackpotValueRange.max !== initialFilters.advanced.jackpotValueRange.max) {
    chips.push({
      type: "jackpotValueRange",
      label: `Jackpot: $${filters.advanced.jackpotValueRange.min.toLocaleString()}-$${filters.advanced.jackpotValueRange.max.toLocaleString()}`
    });
  }
  if (filters.advanced.itemCountRange.min !== 0 || filters.advanced.itemCountRange.max !== initialFilters.advanced.itemCountRange.max) {
    chips.push({
      type: "itemCountRange",
      label: `Items: ${filters.advanced.itemCountRange.min}-${filters.advanced.itemCountRange.max}`
    });
  }
  if (chips.length === 0) return null;
  const handleRemoveFilter = (type, value) => {
    console.log("Removing filter:", type, value);
    if (["priceRange", "expectedValueRange", "volatilityRange", "floorRateRange", "jackpotValueRange", "itemCountRange"].includes(type)) {
      onRemoveFilter(type);
    } else {
      onRemoveFilter(type, value);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 font-medium", children: "Active Filters:" }),
    chips.map((chip, index) => /* @__PURE__ */ jsxs(
      Badge,
      {
        variant: "secondary",
        className: "bg-purple-100 text-purple-700 hover:bg-purple-200 pr-1",
        children: [
          chip.label,
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-4 w-4 p-0 ml-2 hover:bg-purple-300 rounded-full",
              onClick: () => handleRemoveFilter(chip.type, chip.value),
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ]
      },
      `${chip.type}-${chip.value || index}`
    ))
  ] });
};
const FilterControls = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  filters,
  onFiltersChange,
  boxesData,
  activeFiltersCount,
  onClearAllFilters,
  onRemoveFilter,
  filterPanelOpen,
  onFilterPanelOpenChange,
  filteredCount,
  totalCount,
  initialFilters
}) => {
  const isMobile = useIsMobile();
  const { providerCounts, availableCategories } = useMemo(() => {
    const counts = {};
    boxesData.forEach((box) => {
      if (box == null ? void 0 : box.provider) {
        counts[box.provider] = (counts[box.provider] || 0) + 1;
      }
    });
    const categories = [...new Set(boxesData.map((box) => box.category).filter(Boolean))];
    const filteredCategories = categories.filter((cat) => cat !== "Unknown").slice(0, 8);
    return {
      providerCounts: counts,
      availableCategories: filteredCategories
    };
  }, [boxesData]);
  const handleProviderClick = (providerId) => {
    const newProviders = filters.providers.includes(providerId) ? filters.providers.filter((p) => p !== providerId) : [...filters.providers, providerId];
    onFiltersChange({ ...filters, providers: newProviders });
  };
  const handleCategoryClick = (category) => {
    const newCategories = filters.categories.includes(category) ? filters.categories.filter((c) => c !== category) : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: `flex flex-col glass-edge rounded-xl shadow-lg border-purple-200/30 overflow-hidden ${isMobile ? "space-y-5 p-4 mx-3 max-w-[calc(100vw-1.5rem)]" : "space-y-6 p-8"}`,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.5 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsx(Search, { className: `absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 ${isMobile ? "h-5 w-5" : "h-4 w-4"}` }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: isMobile ? "Search boxes..." : "Search mystery boxes, tags, or categories...",
              value: searchTerm,
              onChange: (e) => onSearchChange(e.target.value),
              className: `w-full ${isMobile ? "pl-12 min-h-[48px] text-base" : "pl-10"} bg-white/60 border-purple-300 text-gray-800 placeholder:text-gray-500 transition-all duration-300 focus:bg-white focus:border-purple-400 focus:shadow-md focus:ring-purple-400`,
              inputMode: "search"
            }
          ),
          searchTerm && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: `absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1 text-gray-400 hover:text-gray-600 ${isMobile ? "h-8 w-8" : "h-6 w-6"}`,
              onClick: () => onSearchChange(""),
              children: /* @__PURE__ */ jsx(FilterX, { className: `${isMobile ? "h-4 w-4" : "h-3 w-3"}` })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-3 bg-purple-50/50 rounded-lg border border-purple-200/50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-purple-700", children: "Quick Filters" }),
            (filters.providers.length > 0 || filters.categories.length > 0) && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-purple-100 text-purple-700 text-xs", children: filters.providers.length + filters.categories.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-600", children: "Providers" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(PROVIDER_CONFIGS).map(([providerId, config]) => {
              const isSelected = filters.providers.includes(providerId);
              const count2 = providerCounts[providerId] || 0;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleProviderClick(providerId),
                  className: `
                    flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 text-xs
                    ${isSelected ? "border-purple-400 bg-purple-50 text-purple-700" : "border-gray-200 bg-white hover:border-gray-300 text-gray-600"}
                  `,
                  children: [
                    /* @__PURE__ */ jsx(
                      ProviderLogo,
                      {
                        providerId,
                        size: "sm",
                        enhanced: true
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: config.displayName }),
                    count2 > 0 && /* @__PURE__ */ jsx("span", { className: `
                      px-1.5 py-0.5 rounded-full text-xs
                      ${isSelected ? "bg-purple-200 text-purple-800" : "bg-gray-100 text-gray-600"}
                    `, children: count2 })
                  ]
                },
                providerId
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-gray-600", children: "Categories" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: availableCategories.map((category) => {
              const isSelected = filters.categories.includes(category);
              return /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleCategoryClick(category),
                  className: `
                    px-2 py-1 rounded-full text-xs font-medium transition-all duration-200
                    ${isSelected ? "bg-purple-100 text-purple-700 border border-purple-300" : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"}
                  `,
                  children: category
                },
                category
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `flex gap-3 items-stretch ${isMobile ? "flex-col w-full" : "flex-wrap justify-between"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: `flex gap-3 ${isMobile ? "w-full" : "items-center flex-wrap"}`, children: [
            isMobile ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 w-full", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(SortDropdown, { value: sortBy, onChange: onSortChange }) }),
              /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
                FilterPanel,
                {
                  isOpen: filterPanelOpen,
                  onOpenChange: onFilterPanelOpenChange,
                  filters,
                  onFiltersChange,
                  boxesData,
                  activeFiltersCount
                }
              ) })
            ] }) : (
              // Desktop: Inline layout
              /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(SortDropdown, { value: sortBy, onChange: onSortChange }),
                /* @__PURE__ */ jsx(
                  FilterPanel,
                  {
                    isOpen: filterPanelOpen,
                    onOpenChange: onFilterPanelOpenChange,
                    filters,
                    onFiltersChange,
                    boxesData,
                    activeFiltersCount
                  }
                ),
                activeFiltersCount > 0 && /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: onClearAllFilters,
                    className: "flex items-center gap-2 text-purple-600 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200",
                    children: [
                      /* @__PURE__ */ jsx(FilterX, { className: "h-4 w-4" }),
                      "Clear All",
                      /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-1 bg-purple-100 text-purple-700", children: activeFiltersCount })
                    ]
                  }
                )
              ] })
            ),
            filteredCount === 0 && activeFiltersCount > 0 && /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "default",
                size: isMobile ? "lg" : "sm",
                onClick: onClearAllFilters,
                className: `flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-all duration-200 ${isMobile ? "w-full min-h-[48px] px-6 mt-3" : ""}`,
                children: [
                  /* @__PURE__ */ jsx(Filter, { className: `${isMobile ? "h-5 w-5" : "h-4 w-4"}` }),
                  "Show All Mystery Boxes"
                ]
              }
            )
          ] }),
          !isMobile && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { children: searchTerm ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "Found ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-purple-600", children: filteredCount.toLocaleString() }),
              " matches",
              activeFiltersCount > 0 && /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: " (with filters)" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "Showing ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-purple-600", children: filteredCount.toLocaleString() }),
              " of",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: totalCount.toLocaleString() }),
              " mystery boxes"
            ] }) }),
            activeFiltersCount > 0 && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "bg-purple-50 text-purple-700 border-purple-300", children: [
              activeFiltersCount,
              " filter",
              activeFiltersCount !== 1 ? "s" : "",
              " active"
            ] })
          ] })
        ] }),
        activeFiltersCount > 0 && isMobile && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "lg",
            onClick: onClearAllFilters,
            className: "w-full flex items-center justify-center gap-2 text-purple-600 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 min-h-[48px]",
            children: [
              /* @__PURE__ */ jsx(FilterX, { className: "h-5 w-5" }),
              "Clear All Filters",
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-purple-100 text-purple-700", children: activeFiltersCount })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `${isMobile ? "mt-3" : "mt-2"}`, children: activeFiltersCount > 0 ? isMobile ? /* @__PURE__ */ jsx(
          MobileFilterChips,
          {
            filters,
            onRemoveFilter,
            initialFilters
          }
        ) : /* @__PURE__ */ jsx(
          FilterChips,
          {
            filters,
            onRemoveFilter,
            initialFilters
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Filters:" }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 italic", children: "No filters applied - showing all mystery boxes" })
        ] }) }),
        isMobile && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-sm text-gray-600 pt-2 border-t border-purple-200/50", children: /* @__PURE__ */ jsx("span", { className: "text-center", children: searchTerm ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-purple-600", children: filteredCount.toLocaleString() }),
          " matches found",
          activeFiltersCount > 0 && /* @__PURE__ */ jsxs("span", { className: "block text-xs text-purple-600 mt-1", children: [
            activeFiltersCount,
            " filter",
            activeFiltersCount !== 1 ? "s" : "",
            " active"
          ] })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-purple-600", children: filteredCount.toLocaleString() }),
          " of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: totalCount.toLocaleString() }),
          " boxes",
          activeFiltersCount > 0 && /* @__PURE__ */ jsxs("span", { className: "block text-xs text-purple-600 mt-1", children: [
            activeFiltersCount,
            " filter",
            activeFiltersCount !== 1 ? "s" : "",
            " active"
          ] })
        ] }) }) })
      ]
    }
  );
};
const calculateSearchScore = (searchTerm, boxName, category, tags) => {
  const searchLower = searchTerm.toLowerCase().trim();
  const nameLower = boxName.toLowerCase();
  const categoryLower = category.toLowerCase();
  if (!searchLower) return null;
  let bestMatch = null;
  if (nameLower === searchLower) {
    bestMatch = {
      score: 100,
      matchType: "exact_name",
      matchedTerm: boxName
    };
  } else if (nameLower.startsWith(searchLower)) {
    bestMatch = {
      score: 85,
      matchType: "partial_name",
      matchedTerm: boxName
    };
  } else if (nameLower.includes(searchLower)) {
    const position = nameLower.indexOf(searchLower);
    const lengthRatio = searchLower.length / nameLower.length;
    const positionPenalty = Math.min(position * 2, 20);
    const baseScore = 75 + lengthRatio * 10 - positionPenalty;
    bestMatch = {
      score: Math.max(baseScore, 60),
      // Minimum 60 for name matches
      matchType: "partial_name",
      matchedTerm: boxName
    };
  } else if (categoryLower.includes(searchLower)) {
    bestMatch = {
      score: 50,
      matchType: "category",
      matchedTerm: category
    };
  } else {
    let bestTagScore = 0;
    let bestTagMatch = "";
    for (const tag of tags) {
      const tagLower = String(tag).toLowerCase();
      if (tagLower === searchLower) {
        const score = 35;
        if (score > bestTagScore) {
          bestTagScore = score;
          bestTagMatch = tag;
        }
      } else if (tagLower.includes(searchLower)) {
        const lengthRatio = searchLower.length / tagLower.length;
        const score = Math.min(25 + lengthRatio * 10, 30);
        if (score > bestTagScore) {
          bestTagScore = score;
          bestTagMatch = tag;
        }
      }
    }
    if (bestTagScore > 0) {
      bestMatch = {
        score: bestTagScore,
        matchType: bestTagScore > 30 ? "tag" : "partial_tag",
        matchedTerm: bestTagMatch
      };
    }
  }
  return bestMatch;
};
const calculateMultiWordSearchScore = (searchTerm, boxName, category, tags) => {
  const words = searchTerm.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 0);
  if (words.length === 0) return null;
  if (words.length === 1) return calculateSearchScore(searchTerm, boxName, category, tags);
  const fullPhraseMatch = calculateSearchScore(searchTerm, boxName, category, tags);
  if (fullPhraseMatch && fullPhraseMatch.score >= 60) {
    return fullPhraseMatch;
  }
  const nameLower = boxName.toLowerCase();
  let totalScore = 0;
  let matchedWords = 0;
  let bestMatchType = "partial_tag";
  let matchedTerm = "";
  for (const word of words) {
    if (word.length < 2) continue;
    const wordMatch = calculateSearchScore(word, boxName, category, tags);
    if (wordMatch && wordMatch.score > 0) {
      totalScore += wordMatch.score;
      matchedWords++;
      if (wordMatch.matchType === "exact_name" || wordMatch.matchType === "partial_name") {
        bestMatchType = wordMatch.matchType;
        matchedTerm = boxName;
      }
    }
  }
  if (matchedWords === words.length && matchedWords > 1) {
    totalScore += 15;
  }
  if (matchedWords >= 2) {
    const searchPhrase = words.join("\\s+");
    const regex = new RegExp(searchPhrase, "i");
    if (regex.test(nameLower)) {
      totalScore += 20;
      bestMatchType = "partial_name";
      matchedTerm = boxName;
    }
  }
  const averageScore = totalScore / Math.max(words.length, 1);
  const finalScore = Math.min(averageScore, (fullPhraseMatch == null ? void 0 : fullPhraseMatch.score) || 95);
  if (finalScore > 10) {
    return {
      score: finalScore,
      matchType: bestMatchType,
      matchedTerm: matchedTerm || searchTerm
    };
  }
  return fullPhraseMatch;
};
const sortBySearchRelevance = (boxes, searchTerm, fallbackSort) => {
  if (!searchTerm.trim()) {
    return fallbackSort ? [...boxes].sort(fallbackSort) : boxes;
  }
  return [...boxes].map((box) => {
    const searchMatch = calculateMultiWordSearchScore(
      searchTerm,
      box.box_name || "",
      box.category || "",
      Array.isArray(box.tags) ? box.tags : []
    );
    return {
      ...box,
      _searchScore: (searchMatch == null ? void 0 : searchMatch.score) || 0,
      _searchMatch: searchMatch
    };
  }).sort((a, b) => {
    const scoreDiff = (b._searchScore || 0) - (a._searchScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    if (fallbackSort) {
      return fallbackSort(a, b);
    }
    return (a.box_name || "").localeCompare(b.box_name || "");
  });
};
const useOptimizedFiltering = (boxesData, filters, searchTerm, sortBy) => {
  const applyFilters = useCallback((boxes, currentFilters, search) => {
    if (!boxes || boxes.length === 0) return [];
    return boxes.filter((box) => {
      if (!box) return false;
      if (currentFilters.providers.length > 0) {
        if (!currentFilters.providers.includes(box.provider)) return false;
      }
      if (search && search.trim()) {
        const boxName = String(box.box_name || "");
        const boxTags = Array.isArray(box.tags) ? box.tags : [];
        const boxCategory = String(box.category || "");
        const searchMatch = calculateMultiWordSearchScore(
          search,
          boxName,
          boxCategory,
          boxTags
        );
        if (!searchMatch || searchMatch.score < 10) {
          return false;
        }
      }
      if (currentFilters.categories.length > 0) {
        const boxCategory = String(box.category || "");
        if (!currentFilters.categories.includes(boxCategory)) return false;
      }
      const boxPrice = Number(box.box_price);
      if (!isNaN(boxPrice) && boxPrice > 0) {
        if (boxPrice < currentFilters.priceRange.min || boxPrice > currentFilters.priceRange.max) {
          return false;
        }
      }
      const boxEV = Number(box.expected_value_percent_of_price);
      if (!isNaN(boxEV)) {
        if (boxEV < currentFilters.expectedValueRange.min || boxEV > currentFilters.expectedValueRange.max) {
          return false;
        }
      }
      if (currentFilters.volatilityBuckets.length > 0) {
        const boxVolatilityBucket = box.volatility_bucket;
        if (!boxVolatilityBucket || !currentFilters.volatilityBuckets.includes(boxVolatilityBucket)) {
          return false;
        }
      }
      const boxVolatility = Number(box.standard_deviation_percent);
      if (!isNaN(boxVolatility) && boxVolatility >= 0) {
        if (boxVolatility < currentFilters.volatilityRange.min || boxVolatility > currentFilters.volatilityRange.max) {
          return false;
        }
      }
      const boxFloorRate = Number(box.floor_rate_percent);
      if (!isNaN(boxFloorRate) && boxFloorRate >= 0) {
        if (boxFloorRate < currentFilters.floorRateRange.min || boxFloorRate > currentFilters.floorRateRange.max) {
          return false;
        }
      }
      if (currentFilters.tags.length > 0) {
        const boxTags = Array.isArray(box.tags) ? box.tags : [];
        if (!currentFilters.tags.some((tag) => boxTags.includes(tag))) {
          return false;
        }
      }
      return true;
    });
  }, []);
  const applySorting = useCallback((boxes, sortOption) => {
    return [...boxes].sort((a, b) => {
      const getValue = (box, field) => {
        const value = Number(box[field]);
        return isNaN(value) ? 0 : value;
      };
      const getMysteryBoost = (box) => {
        const name = String(box.box_name || "").toLowerCase();
        const tags = Array.isArray(box.tags) ? box.tags : [];
        return name.includes("mystery") || tags.some((tag) => String(tag).toLowerCase().includes("mystery")) ? 1 : 0;
      };
      const getProviderPriority = (box) => {
        const priorities = { rillabox: 4, hypedrop: 3, casesgg: 2, luxdrop: 1 };
        return priorities[box.provider] || 0;
      };
      switch (sortOption) {
        case "ev_desc":
          const evDiff = getValue(b, "expected_value_percent_of_price") - getValue(a, "expected_value_percent_of_price");
          if (evDiff !== 0) return evDiff;
          const mysteryDiff = getMysteryBoost(b) - getMysteryBoost(a);
          return mysteryDiff !== 0 ? mysteryDiff : getProviderPriority(b) - getProviderPriority(a);
        case "ev_asc":
          const evAscDiff = getValue(a, "expected_value_percent_of_price") - getValue(b, "expected_value_percent_of_price");
          if (evAscDiff !== 0) return evAscDiff;
          return getMysteryBoost(b) - getMysteryBoost(a);
        case "price_desc":
          return getValue(b, "box_price") - getValue(a, "box_price");
        case "price_asc":
          return getValue(a, "box_price") - getValue(b, "box_price");
        case "volatility_desc":
          return getValue(b, "standard_deviation_percent") - getValue(a, "standard_deviation_percent");
        case "volatility_asc":
          return getValue(a, "standard_deviation_percent") - getValue(b, "standard_deviation_percent");
        case "floor_desc":
          return getValue(b, "floor_rate_percent") - getValue(a, "floor_rate_percent");
        case "floor_asc":
          return getValue(a, "floor_rate_percent") - getValue(b, "floor_rate_percent");
        case "name_asc":
          return (a.box_name || "").localeCompare(b.box_name || "");
        case "name_desc":
          return (b.box_name || "").localeCompare(a.box_name || "");
        default:
          return getProviderPriority(b) - getProviderPriority(a);
      }
    });
  }, []);
  const filteredAndSortedBoxes = useMemo(() => {
    const filtered = applyFilters(boxesData, filters, searchTerm);
    if (searchTerm && searchTerm.trim()) {
      return sortBySearchRelevance(filtered, searchTerm, (a, b) => {
        return applySorting([a, b], sortBy)[0] === a ? -1 : 1;
      });
    }
    return applySorting(filtered, sortBy);
  }, [boxesData, filters, searchTerm, sortBy, applyFilters, applySorting]);
  return filteredAndSortedBoxes;
};
const BoxfolioDashboard = ({
  summaryData,
  boxesData,
  isUnified = false,
  showOnlyStats = false,
  showOnlyContent = false,
  selectedProvider = null
}) => {
  const initialFilters = useMemo(() => {
    if (!boxesData || boxesData.length === 0) {
      return {
        categories: [],
        providers: selectedProvider ? [selectedProvider] : [],
        priceRange: { min: 0, max: 1e3 },
        expectedValueRange: { min: 0, max: 200 },
        volatilityBuckets: [],
        volatilityRange: { min: 0, max: 100 },
        floorRateRange: { min: 0, max: 100 },
        tags: [],
        advanced: {
          jackpotValueRange: { min: 0, max: 1e4 },
          itemCountRange: { min: 0, max: 100 }
        }
      };
    }
    const validPrices = boxesData.map((box) => Number(box == null ? void 0 : box.box_price)).filter((p) => !isNaN(p) && p > 0);
    const validEvs = boxesData.map((box) => Number(box == null ? void 0 : box.expected_value_percent_of_price)).filter((v) => !isNaN(v) && v >= 0);
    const validFloors = boxesData.map((box) => Number(box == null ? void 0 : box.floor_rate_percent)).filter((v) => !isNaN(v) && v >= 0);
    const validVolatilities = boxesData.map((box) => Number(box == null ? void 0 : box.standard_deviation_percent)).filter((v) => !isNaN(v) && v >= 0);
    return {
      categories: [],
      providers: selectedProvider ? [selectedProvider] : [],
      priceRange: {
        min: validPrices.length > 0 ? Math.floor(Math.min(...validPrices)) : 0,
        max: validPrices.length > 0 ? Math.ceil(Math.max(...validPrices)) : 1e3
      },
      expectedValueRange: {
        min: 0,
        max: validEvs.length > 0 ? Math.ceil(Math.max(...validEvs)) : 200
      },
      volatilityBuckets: [],
      volatilityRange: {
        min: 0,
        max: validVolatilities.length > 0 ? Math.ceil(Math.max(...validVolatilities)) : 100
      },
      floorRateRange: {
        min: validFloors.length > 0 ? Math.floor(Math.min(...validFloors)) : 0,
        max: validFloors.length > 0 ? Math.ceil(Math.max(...validFloors)) : 100
      },
      tags: [],
      advanced: {
        jackpotValueRange: { min: 0, max: 1e4 },
        itemCountRange: { min: 0, max: 100 }
      }
    };
  }, [boxesData, selectedProvider]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [animatedStats, setAnimatedStats] = useState({
    portfolioEV: 0,
    bestBoxEV: 0,
    worstBoxEV: 0,
    avgVolatility: 0
  });
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOutCubic;
        setAnimatedStats((prev) => ({
          ...prev,
          [key]: current
        }));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };
    setTimeout(() => {
      animateValue(0, (summaryData == null ? void 0 : summaryData.portfolio_average_ev_percent) || 0, 2e3, "portfolioEV");
      animateValue(0, (summaryData == null ? void 0 : summaryData.best_box_ev_percent) || 0, 2200, "bestBoxEV");
      animateValue(0, (summaryData == null ? void 0 : summaryData.worst_box_ev_percent) || 0, 1800, "worstBoxEV");
      animateValue(0, (summaryData == null ? void 0 : summaryData.portfolio_average_standard_deviation_percent) || 0, 2400, "avgVolatility");
    }, 600);
  }, [summaryData]);
  const activeFiltersCount = useMemo(() => {
    let count2 = 0;
    if (filters.categories.length > 0) count2++;
    if (filters.providers.length > 0) count2++;
    if (filters.tags.length > 0) count2++;
    if (filters.volatilityBuckets.length > 0) count2++;
    if (filters.priceRange.min !== initialFilters.priceRange.min || filters.priceRange.max !== initialFilters.priceRange.max) count2++;
    if (filters.expectedValueRange.min !== initialFilters.expectedValueRange.min || filters.expectedValueRange.max !== initialFilters.expectedValueRange.max) count2++;
    if (filters.volatilityRange.min !== initialFilters.volatilityRange.min || filters.volatilityRange.max !== initialFilters.volatilityRange.max) count2++;
    if (filters.floorRateRange.min !== initialFilters.floorRateRange.min || filters.floorRateRange.max !== initialFilters.floorRateRange.max) count2++;
    return count2;
  }, [filters, initialFilters]);
  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }, [initialFilters]);
  const removeFilter = useCallback((filterType, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      switch (filterType) {
        case "category":
          newFilters.categories = prevFilters.categories.filter((cat) => cat !== value);
          break;
        case "provider":
          newFilters.providers = prevFilters.providers.filter((prov) => prov !== value);
          break;
        case "tag":
          newFilters.tags = prevFilters.tags.filter((tag) => tag !== value);
          break;
        case "priceRange":
          newFilters.priceRange = initialFilters.priceRange;
          break;
        case "expectedValueRange":
          newFilters.expectedValueRange = initialFilters.expectedValueRange;
          break;
        case "volatilityRange":
          newFilters.volatilityRange = initialFilters.volatilityRange;
          break;
        case "floorRateRange":
          newFilters.floorRateRange = initialFilters.floorRateRange;
          break;
        case "volatilityBucket":
          newFilters.volatilityBuckets = [];
          break;
      }
      return newFilters;
    });
    setCurrentPage(1);
  }, [initialFilters]);
  useMemo(() => {
    const startIndex2 = (currentPage - 1) * itemsPerPage;
    const endIndex2 = startIndex2 + itemsPerPage;
    return boxesData.slice(startIndex2, endIndex2);
  }, [boxesData, currentPage, itemsPerPage]);
  const filteredAndSortedBoxes = useOptimizedFiltering(
    boxesData,
    filters,
    debouncedSearchTerm,
    sortBy
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filters, sortBy]);
  const totalPages = Math.ceil(filteredAndSortedBoxes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredAndSortedBoxes.length);
  if (showOnlyStats) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Avg. Expected Value" }),
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: [
          animatedStats.portfolioEV.toFixed(1),
          "%"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Best Box" }),
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: [
            animatedStats.bestBoxEV.toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1 font-medium truncate", children: summaryData == null ? void 0 : summaryData.best_box_by_ev_percent })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Worst Box" }),
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent", children: [
            animatedStats.worstBoxEV.toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1 font-medium truncate", children: summaryData == null ? void 0 : summaryData.worst_box_by_ev_percent })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Avg. Volatility" }),
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: [
          animatedStats.avgVolatility.toFixed(1),
          "%"
        ] }) })
      ] }) })
    ] });
  }
  if (showOnlyContent) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FilterControls,
        {
          searchTerm,
          onSearchChange: setSearchTerm,
          sortBy,
          onSortChange: setSortBy,
          filters,
          onFiltersChange: setFilters,
          boxesData,
          activeFiltersCount,
          onClearAllFilters: clearAllFilters,
          onRemoveFilter: removeFilter,
          filterPanelOpen,
          onFilterPanelOpenChange: setFilterPanelOpen,
          filteredCount: filteredAndSortedBoxes.length,
          totalCount: boxesData.length,
          initialFilters
        }
      ),
      /* @__PURE__ */ jsx(
        PaginationControls,
        {
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          startIndex,
          endIndex,
          totalItems: filteredAndSortedBoxes.length
        }
      ),
      /* @__PURE__ */ jsx(
        VirtualizedBoxGrid,
        {
          boxes: filteredAndSortedBoxes,
          itemsPerPage,
          currentPage
        }
      ),
      /* @__PURE__ */ jsx(
        PaginationControls,
        {
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          startIndex,
          endIndex,
          totalItems: filteredAndSortedBoxes.length
        }
      ),
      filteredAndSortedBoxes.length === 0 && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "text-center py-12",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsx("div", { className: "text-xl text-gray-600", children: "No boxes found matching your criteria" })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "text-center space-y-6",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/208a85a9-4108-4646-8cb0-aed2a05655ab.png",
              alt: "Unpacked.gg Logo",
              className: "h-32 object-contain"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: isUnified ? "Multi-Provider Mystery Box Hub" : "Mystery Box Analytics" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: isUnified ? `Discover the perfect mystery box across ${(summaryData == null ? void 0 : summaryData.provider_breakdown) ? Object.keys(summaryData.provider_breakdown).length : 4} providers. Compare, analyze, and find the best value.` : "Discover the perfect mystery box for your risk appetite." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3 },
        children: [
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Avg. Expected Value" }),
              /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: [
              animatedStats.portfolioEV.toFixed(1),
              "%"
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Best Box" }),
              /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: [
                animatedStats.bestBoxEV.toFixed(1),
                "%"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1 font-medium truncate", children: summaryData == null ? void 0 : summaryData.best_box_by_ev_percent })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Worst Box" }),
              /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent", children: [
                animatedStats.worstBoxEV.toFixed(1),
                "%"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1 font-medium truncate", children: summaryData == null ? void 0 : summaryData.worst_box_by_ev_percent })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.02, y: -2 }, transition: { type: "spring", stiffness: 300 }, children: /* @__PURE__ */ jsxs(Card, { className: "glass-edge hover:shadow-xl transition-all duration-300 border-purple-200/50", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Avg. Volatility" }),
              /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 text-purple-500 drop-shadow-sm" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent", children: [
              animatedStats.avgVolatility.toFixed(1),
              "%"
            ] }) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FilterControls,
      {
        searchTerm,
        onSearchChange: setSearchTerm,
        sortBy,
        onSortChange: setSortBy,
        filters,
        onFiltersChange: setFilters,
        boxesData,
        activeFiltersCount,
        onClearAllFilters: clearAllFilters,
        onRemoveFilter: removeFilter,
        filterPanelOpen,
        onFilterPanelOpenChange: setFilterPanelOpen,
        filteredCount: filteredAndSortedBoxes.length,
        totalCount: boxesData.length,
        initialFilters
      }
    ),
    /* @__PURE__ */ jsx(
      PaginationControls,
      {
        currentPage,
        totalPages,
        onPageChange: setCurrentPage,
        startIndex,
        endIndex,
        totalItems: filteredAndSortedBoxes.length
      }
    ),
    /* @__PURE__ */ jsx(
      VirtualizedBoxGrid,
      {
        boxes: filteredAndSortedBoxes,
        itemsPerPage,
        currentPage
      }
    ),
    /* @__PURE__ */ jsx(
      PaginationControls,
      {
        currentPage,
        totalPages,
        onPageChange: setCurrentPage,
        startIndex,
        endIndex,
        totalItems: filteredAndSortedBoxes.length
      }
    ),
    filteredAndSortedBoxes.length === 0 && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-center py-12",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsx("div", { className: "text-xl text-gray-600", children: "No boxes found matching your criteria" })
      }
    )
  ] }) });
};
const SkeletonStatsCard = () => {
  return /* @__PURE__ */ jsxs(Card, { className: "glass-edge border-purple-200/50", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32 bg-gray-200" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-5 bg-gray-200 rounded" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-20 mb-2 bg-gray-200" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24 bg-gray-200" })
    ] })
  ] });
};
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const ItemSearchInput = ({
  searchQuery,
  searchResults,
  onSearchChange,
  onItemSelect,
  onClearSearch
}) => {
  const isMobile = useIsMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    setIsDropdownOpen(searchResults.length > 0 && searchQuery.length >= 2);
  }, [searchResults, searchQuery]);
  const handleItemSelect = (item) => {
    var _a2;
    onItemSelect(item);
    setIsDropdownOpen(false);
    (_a2 = inputRef.current) == null ? void 0 : _a2.blur();
  };
  const handleInputFocus = () => {
    if (searchResults.length > 0 && searchQuery.length >= 2) {
      setIsDropdownOpen(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      var _a2;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !((_a2 = inputRef.current) == null ? void 0 : _a2.contains(event.target))) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log("ItemSearchInput render:", {
    searchQuery,
    searchResultsCount: searchResults.length,
    isDropdownOpen,
    isMobile
  });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      !isMobile && /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 z-10", children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "cursor-help p-2", children: /* @__PURE__ */ jsx(Info, { className: "h-4 w-4 text-gray-400 hover:text-purple-500 transition-colors" }) }) }),
        /* @__PURE__ */ jsx(TooltipContent, { side: "top", className: "max-w-xs p-3 bg-white border-purple-200 shadow-xl z-50", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-purple-600 text-sm", children: "Hunt for specific items" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Search for any item and get ranked boxes to win it most cost-effectively." })
        ] }) })
      ] }) }) }),
      isMobile && /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 z-10", children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 text-gray-400" }) }),
      /* @__PURE__ */ jsx(
        Input,
        {
          ref: inputRef,
          placeholder: isMobile ? "Hunt for an item..." : "Hunt for a specific item... (e.g., 'Nike Air Jordan')",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          onFocus: handleInputFocus,
          className: `
            ${isMobile ? "pl-12 pr-12 h-12" : "pl-12 pr-12 py-3"} 
            text-base bg-white border-purple-300 
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
            rounded-xl shadow-sm
          `
        }
      ),
      searchQuery && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClearSearch,
          className: `
              absolute right-3 top-1/2 transform -translate-y-1/2 
              hover:bg-gray-100 rounded-full 
              ${isMobile ? "p-2" : "p-1"} 
              transition-colors z-10
            `,
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-gray-400 hover:text-red-500" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isDropdownOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: dropdownRef,
        initial: { opacity: 0, y: -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 },
        transition: { duration: 0.15 },
        className: "w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-lg",
        children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-48 w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
          searchResults.map((item, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => handleItemSelect(item),
              className: `
                      px-3 py-3 hover:bg-purple-50 cursor-pointer 
                      rounded-lg mb-1 last:mb-0
                      flex items-center gap-3 transition-colors
                      ${isMobile ? "min-h-[48px]" : "min-h-[44px]"}
                      active:bg-purple-100
                    `,
              children: [
                /* @__PURE__ */ jsx(Target, { className: "h-4 w-4 text-purple-500 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-800 text-sm leading-tight flex-1 break-words", children: item })
              ]
            },
            `${item}-${index}`
          )),
          searchResults.length === 0 && searchQuery.length >= 2 && /* @__PURE__ */ jsxs("div", { className: "px-3 py-6 text-center text-gray-500 text-sm", children: [
            'No items found matching "',
            searchQuery,
            '"'
          ] })
        ] }) })
      }
    ) })
  ] });
};
const TargetItemDisplay = ({
  selectedItem,
  itemImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
}) => {
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 shadow-sm`, children: [
    /* @__PURE__ */ jsx(Target, { className: `${isMobile ? "h-4 w-4" : "h-5 w-5"} text-purple-600 flex-shrink-0` }),
    /* @__PURE__ */ jsx("div", { className: `${isMobile ? "w-10 h-10" : "w-12 h-12"} flex items-center justify-center bg-white rounded-lg border-2 border-purple-300 shadow-sm flex-shrink-0`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: itemImage,
        alt: selectedItem,
        className: `${isMobile ? "w-8 h-8" : "w-10 h-10"} rounded-lg object-cover`
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: `text-gray-600 ${isMobile ? "text-xs" : "text-sm"} font-medium`, children: "Target Item:" }),
      /* @__PURE__ */ jsx("p", { className: `font-bold ${isMobile ? "text-sm" : "text-base"} text-purple-700 leading-tight`, style: { wordBreak: "break-word" }, children: selectedItem })
    ] })
  ] });
};
const calculateCostRange = (boxPrice, dropChance) => {
  if (!dropChance || dropChance <= 0) {
    return { low: 0, high: 0 };
  }
  const p = dropChance / 100;
  const percentile25 = Math.ceil(Math.log(0.75) / Math.log(1 - p));
  const percentile75 = Math.ceil(Math.log(0.25) / Math.log(1 - p));
  return {
    low: percentile25 * boxPrice,
    high: percentile75 * boxPrice
  };
};
const calculateExpectedMoneyLeftRange = (box, targetItem, targetingCost) => {
  if (!targetItem.drop_chance || targetItem.drop_chance <= 0) {
    return { low: 0, high: 0, profitProbability: 0, costRange: { low: 0, high: 0 } };
  }
  const baseEV = (box.expected_value_percent_of_price || 0) / 100;
  const standardDev = (box.standard_deviation_percent || 0) / 100;
  const floorRate = (box.floor_rate_percent || 0) / 100;
  const boxPrice = box.box_price;
  const costRange = calculateCostRange(boxPrice, targetItem.drop_chance);
  const isUltraRare = targetItem.drop_chance < 1e-3;
  const isExpensiveHunt = targetingCost > 1e5;
  const isMassiveScale = Math.ceil(100 / targetItem.drop_chance) > 5e4;
  let scalingPenalty = 0;
  if (isUltraRare) scalingPenalty += 0.15;
  if (isExpensiveHunt) scalingPenalty += 0.1;
  if (isMassiveScale) scalingPenalty += Math.min(Math.ceil(100 / targetItem.drop_chance) / 5e5, 0.2);
  const effectiveEV = Math.max(0.5, baseEV - scalingPenalty);
  const conservativeMultiplier = Math.max(
    floorRate * 0.8,
    effectiveEV - standardDev * 0.674
  );
  const optimisticMultiplier = Math.min(
    effectiveEV + standardDev * 0.674,
    effectiveEV + 0.15
  );
  const lowReturn = costRange.low / boxPrice * boxPrice * conservativeMultiplier;
  const highReturn = costRange.high / boxPrice * boxPrice * optimisticMultiplier;
  const lowEstimate = lowReturn - costRange.low;
  const highEstimate = highReturn - costRange.high;
  const breakEvenMultiplier = targetingCost / (Math.ceil(100 / targetItem.drop_chance) * boxPrice);
  const adjustedZScore = (breakEvenMultiplier - effectiveEV) / Math.max(standardDev, 0.05);
  let baseProfitProb = Math.max(0, Math.min(100, (1 - normalCDF(adjustedZScore)) * 100));
  if (isUltraRare) baseProfitProb *= 0.6;
  if (isExpensiveHunt) baseProfitProb *= 0.7;
  if (isMassiveScale) baseProfitProb *= Math.max(0.4, 1 - Math.ceil(100 / targetItem.drop_chance) / 2e5);
  if (lowEstimate < 0 && highEstimate < 0) {
    baseProfitProb *= 0.3;
  } else if (lowEstimate < 0) {
    baseProfitProb *= 0.75;
  }
  const profitProbability = Math.max(1, Math.min(95, baseProfitProb));
  return {
    low: Math.round(lowEstimate),
    high: Math.round(highEstimate),
    profitProbability: Math.round(profitProbability),
    costRange: {
      low: Math.round(costRange.low),
      high: Math.round(costRange.high)
    }
  };
};
const normalCDF = (z) => {
  if (z < -6) return 0;
  if (z > 6) return 1;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - prob : prob;
};
const formatDropChance = (dropChance) => {
  if (!dropChance || isNaN(dropChance)) return { percentage: "0%", ratio: "1 in ∞ boxes" };
  const percentage = dropChance;
  let percentageStr;
  if (percentage >= 1) {
    percentageStr = `${percentage.toFixed(1).replace(/\.0$/, "")}%`;
  } else if (percentage >= 0.1) {
    percentageStr = `${percentage.toFixed(2).replace(/\.?0+$/, "")}%`;
  } else if (percentage >= 0.01) {
    percentageStr = `${percentage.toFixed(3).replace(/\.?0+$/, "")}%`;
  } else if (percentage >= 1e-3) {
    percentageStr = `${percentage.toFixed(4).replace(/\.?0+$/, "")}%`;
  } else if (percentage >= 1e-4) {
    percentageStr = `${percentage.toFixed(5).replace(/\.?0+$/, "")}%`;
  } else {
    percentageStr = `${percentage.toFixed(6).replace(/\.?0+$/, "")}%`;
  }
  const exactRatio = Math.round(100 / percentage);
  return {
    percentage: percentageStr,
    ratio: `1 in ${exactRatio.toLocaleString()} boxes`
  };
};
const MobileHuntResults = ({
  huntResults,
  selectedItem,
  onClearSearch
}) => {
  const [expandedCards, setExpandedCards] = useState(/* @__PURE__ */ new Set());
  const toggleCardDetails = (index) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };
  const getRankingIcon = (rank) => {
    switch (rank) {
      case 1:
        return /* @__PURE__ */ jsx(Trophy, { className: "h-4 w-4 text-yellow-500" });
      case 2:
        return /* @__PURE__ */ jsx(Medal, { className: "h-4 w-4 text-gray-400" });
      case 3:
        return /* @__PURE__ */ jsx(Award, { className: "h-4 w-4 text-amber-600" });
      default:
        return /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xs", children: rank });
    }
  };
  const getRankBadge = (rank) => {
    const badges = {
      1: { text: "BEST", class: "bg-green-500 text-white" },
      2: { text: "GOOD", class: "bg-blue-500 text-white" },
      3: { text: "FAIR", class: "bg-orange-500 text-white" }
    };
    const badge = badges[rank] || { text: `#${rank}`, class: "bg-gray-500 text-white" };
    return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-bold ${badge.class}`, children: badge.text });
  };
  const getProfitProbability = (result) => {
    const moneyLeftRange = calculateExpectedMoneyLeftRange(result.box, result.targetItem, result.targetingCost);
    return moneyLeftRange.profitProbability;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: huntResults.slice(0, 5).map((result, index) => {
      const boxesNeeded = Math.ceil(100 / result.targetItem.drop_chance);
      const profitProbability = getProfitProbability(result);
      const dropChanceData = formatDropChance(result.targetItem.drop_chance);
      const moneyLeftRange = calculateExpectedMoneyLeftRange(result.box, result.targetItem, result.targetingCost);
      const isCardExpanded = expandedCards.has(index);
      return /* @__PURE__ */ jsx(Card, { className: "hunt-card hover:shadow-md transition-all overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 flex-shrink-0", children: [
            getRankingIcon(result.rank),
            getRankBadge(result.rank)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: result.box.box_image || "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=60&h=60&fit=crop",
                alt: result.box.box_name,
                className: "w-10 h-10 rounded-lg object-cover flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-gray-800 leading-tight mb-1", children: result.box.box_name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600", children: [
                "$",
                result.box.box_price,
                " per box"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "h-3 w-3 text-gray-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 font-medium", children: "Cost" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-gray-800", children: [
              "$",
              Math.round(result.targetingCost).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
              /* @__PURE__ */ jsx(Target, { className: "h-3 w-3 text-gray-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 font-medium", children: "Chance" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gray-800", children: dropChanceData.percentage })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [
              /* @__PURE__ */ jsx(Zap, { className: "h-3 w-3 text-gray-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 font-medium", children: "Profit" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `text-xs font-bold ${profitProbability > 50 ? "text-green-600" : profitProbability > 25 ? "text-yellow-600" : "text-red-600"}`, children: [
              profitProbability,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-2 rounded-lg border border-blue-200 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "h-3 w-3 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-700 font-medium", children: "Expected Money Left" }),
            /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Info, { className: "h-2 w-2 text-blue-400 cursor-help" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { side: "top", className: "max-w-xs p-2", children: /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Money remaining after winning the item, considering volatility." }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold", children: [
            /* @__PURE__ */ jsxs("span", { className: moneyLeftRange.low >= 0 ? "text-green-600" : "text-red-600", children: [
              moneyLeftRange.low >= 0 ? "+" : "",
              "$",
              moneyLeftRange.low.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 mx-1", children: "to" }),
            /* @__PURE__ */ jsxs("span", { className: moneyLeftRange.high >= 0 ? "text-green-600" : "text-red-600", children: [
              moneyLeftRange.high >= 0 ? "+" : "",
              "$",
              moneyLeftRange.high.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => toggleCardDetails(index),
            className: "w-full justify-between text-xs text-gray-600 hover:text-gray-800 h-10 px-0",
            children: [
              /* @__PURE__ */ jsx("span", { children: isCardExpanded ? "Hide Details" : "Show Details" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: `h-4 w-4 transition-transform ${isCardExpanded ? "rotate-90" : ""}` })
            ]
          }
        ),
        isCardExpanded && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "mt-3 pt-3 border-t border-gray-200 space-y-3",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600 block mb-1", children: "Boxes Needed:" }),
                  /* @__PURE__ */ jsxs("div", { className: "font-semibold text-gray-800", children: [
                    "~",
                    boxesNeeded.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600 block mb-1", children: "Drop Rate:" }),
                  /* @__PURE__ */ jsx("div", { className: "font-semibold text-gray-800", children: dropChanceData.ratio })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-700 mb-1 font-medium", children: "Statistical Analysis" }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-800 leading-relaxed", children: [
                  "This box has a ",
                  /* @__PURE__ */ jsxs("strong", { children: [
                    profitProbability,
                    "%"
                  ] }),
                  " statistical probability of being profitable when hunting for this item, based on box value distribution and volatility."
                ] })
              ] })
            ]
          }
        )
      ] }) }, index);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 z-50", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: onClearSearch,
        className: "bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg w-14 h-14 p-0",
        size: "icon",
        children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
      }
    ) })
  ] });
};
const HuntExperience = ({
  searchQuery,
  searchResults,
  selectedItem,
  huntResults,
  onSearchChange,
  onItemSelect,
  onClearSearch,
  getItemImage
}) => {
  const isMobile = useIsMobile();
  const getRankingIcon = (rank) => {
    switch (rank) {
      case 1:
        return /* @__PURE__ */ jsx(Trophy, { className: "h-6 w-6 text-yellow-500" });
      case 2:
        return /* @__PURE__ */ jsx(Medal, { className: "h-6 w-6 text-gray-400" });
      case 3:
        return /* @__PURE__ */ jsx(Award, { className: "h-6 w-6 text-amber-600" });
      default:
        return /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm", children: rank });
    }
  };
  const getRankBadge = (rank) => {
    const badges = {
      1: { text: "BEST DEAL", class: "bg-green-500 text-white" },
      2: { text: "GOOD", class: "bg-blue-500 text-white" },
      3: { text: "FAIR", class: "bg-orange-500 text-white" }
    };
    const badge = badges[rank] || { text: `#${rank}`, class: "bg-gray-500 text-white" };
    return /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-bold ${badge.class}`, children: badge.text });
  };
  const getProfitProbability = (result) => {
    const moneyLeftRange = calculateExpectedMoneyLeftRange(result.box, result.targetItem, result.targetingCost);
    return moneyLeftRange.profitProbability;
  };
  console.log("HuntExperience render:", {
    searchQuery,
    searchResultsCount: searchResults.length,
    selectedItem,
    huntResultsCount: huntResults.length,
    isMobile
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.4 },
      className: "mb-8",
      children: /* @__PURE__ */ jsx(Card, { className: "glass-edge border-purple-200/50 shadow-lg overflow-hidden", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-0", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200/50", children: /* @__PURE__ */ jsx("div", { className: `${isMobile ? "p-4" : "p-6"} text-center space-y-3`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: `${isMobile ? "p-2" : "p-3"} bg-purple-100 rounded-full`, children: /* @__PURE__ */ jsx(Target, { className: `${isMobile ? "h-5 w-5" : "h-6 w-6"} text-purple-600` }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: `${isMobile ? "text-xl" : "text-2xl"} font-bold text-gray-800`, children: "Item Hunter" }),
            /* @__PURE__ */ jsx("p", { className: `text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`, children: "Find the most cost-effective boxes to win any specific item" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: `${isMobile ? "p-4" : "p-6"} border-b border-gray-100 relative`, children: /* @__PURE__ */ jsx(
          ItemSearchInput,
          {
            searchQuery,
            searchResults,
            onSearchChange,
            onItemSelect,
            onClearSearch
          }
        ) }),
        selectedItem && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "border-b border-gray-100",
            children: /* @__PURE__ */ jsx("div", { className: `${isMobile ? "p-4" : "p-6"}`, children: /* @__PURE__ */ jsx(
              TargetItemDisplay,
              {
                selectedItem,
                itemImage: getItemImage(selectedItem)
              }
            ) })
          }
        ),
        huntResults.length > 0 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4 },
            className: `${isMobile ? "p-4" : "p-6"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: `${isMobile ? "text-base" : "text-lg"} font-bold text-gray-800 mb-2`, children: "Hunt Analysis Results" }),
                /* @__PURE__ */ jsxs("p", { className: `${isMobile ? "text-xs" : "text-sm"} text-gray-600`, children: [
                  'Ranked by cost-effectiveness for winning "',
                  selectedItem,
                  '"'
                ] })
              ] }),
              isMobile ? /* @__PURE__ */ jsx(
                MobileHuntResults,
                {
                  huntResults,
                  selectedItem,
                  onClearSearch
                }
              ) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: huntResults.slice(0, 5).map((result, index) => {
                const boxesNeeded = Math.ceil(100 / result.targetItem.drop_chance);
                const profitProbability = getProfitProbability(result);
                const dropChanceData = formatDropChance(result.targetItem.drop_chance);
                const moneyLeftRange = calculateExpectedMoneyLeftRange(result.box, result.targetItem, result.targetingCost);
                return /* @__PURE__ */ jsx(Card, { className: "hunt-card hover:shadow-lg transition-all border border-gray-200", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 flex-shrink-0", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: getRankingIcon(result.rank) }),
                    getRankBadge(result.rank),
                    /* @__PURE__ */ jsx("div", { className: "relative p-2 bg-white rounded-xl shadow-sm", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: result.box.box_image || "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=120&h=120&fit=crop",
                        alt: result.box.box_name,
                        className: "w-20 h-20 rounded-lg object-cover"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl text-gray-800 mb-1", children: result.box.box_name }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                        "Box Price: ",
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                          "$",
                          result.box.box_price.toLocaleString()
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                          /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-green-600" }),
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-green-700", children: "Expected Cost" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-green-800", children: [
                          "$",
                          Math.round(result.targetingCost).toLocaleString()
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "text-xs text-green-600 mt-1", children: "to win this item" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                          /* @__PURE__ */ jsx(Target, { className: "h-4 w-4 text-blue-600" }),
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-blue-700", children: "Drop Chance" })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-blue-800", children: dropChanceData.percentage }),
                        /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-600 mt-1", children: dropChanceData.ratio })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                          /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-purple-600" }),
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-purple-700", children: "Profit Chance" }),
                          /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                            /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Info, { className: "h-3 w-3 text-purple-400 cursor-help" }) }),
                            /* @__PURE__ */ jsx(TooltipContent, { side: "top", className: "max-w-xs p-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Statistical probability that hunting for this item will be profitable, considering box value distribution and targeting cost." }) })
                          ] }) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${profitProbability > 50 ? "text-green-600" : profitProbability > 25 ? "text-yellow-600" : "text-red-600"}`, children: [
                          profitProbability,
                          "%"
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "text-xs text-purple-600 mt-1", children: "profitability estimate" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                        /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-gray-600" }),
                        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-800", children: "Expected Money Left" }),
                        /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Info, { className: "h-3 w-3 text-gray-400 cursor-help" }) }),
                          /* @__PURE__ */ jsx(TooltipContent, { side: "top", className: "max-w-xs p-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Expected money remaining after successfully obtaining the target item, accounting for volatility and practical limitations." }) })
                        ] }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "text-lg font-bold", children: [
                        /* @__PURE__ */ jsxs("span", { className: moneyLeftRange.low >= 0 ? "text-green-600" : "text-red-600", children: [
                          moneyLeftRange.low >= 0 ? "+" : "",
                          "$",
                          moneyLeftRange.low.toLocaleString()
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-gray-500 mx-2", children: "to" }),
                        /* @__PURE__ */ jsxs("span", { className: moneyLeftRange.high >= 0 ? "text-green-600" : "text-red-600", children: [
                          moneyLeftRange.high >= 0 ? "+" : "",
                          "$",
                          moneyLeftRange.high.toLocaleString()
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600 mt-1", children: "Range accounts for box value volatility" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-lg border border-gray-200", children: [
                      /* @__PURE__ */ jsx("h5", { className: "font-semibold text-gray-800 mb-3", children: "Hunt Analysis" }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Expected Boxes Needed:" }),
                          /* @__PURE__ */ jsxs("div", { className: "font-bold text-gray-800 text-lg", children: [
                            "~",
                            boxesNeeded.toLocaleString()
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Actual Cost Range:" }),
                          /* @__PURE__ */ jsxs("div", { className: "font-bold text-gray-800 text-lg", children: [
                            "$",
                            moneyLeftRange.costRange.low.toLocaleString(),
                            " - $",
                            moneyLeftRange.costRange.high.toLocaleString()
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: "Based on probability distribution" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-700 mb-1 font-medium", children: "💡 Strategy Tip" }),
                        /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-800", children: [
                          result.rank === 1 ? "This is your best option! Highest chance of cost-effective success." : result.rank <= 3 ? "Good alternative with reasonable cost-effectiveness." : "Consider this option only if top choices aren't available.",
                          profitProbability < 25 && " Note: Low profit probability - consider if this hunt is worth the risk."
                        ] })
                      ] })
                    ] })
                  ] })
                ] }) }) }, index);
              }) }),
              !isMobile && /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-gray-200 text-center", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClearSearch,
                  className: "px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors",
                  children: "Clear Hunt"
                }
              ) })
            ]
          }
        ),
        !selectedItem && !searchQuery && /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "p-6" : "p-8"} text-center`, children: [
          /* @__PURE__ */ jsx("div", { className: `p-4 bg-gray-50 rounded-full ${isMobile ? "w-12 h-12" : "w-16 h-16"} mx-auto mb-4 flex items-center justify-center`, children: /* @__PURE__ */ jsx(Search, { className: `${isMobile ? "h-6 w-6" : "h-8 w-8"} text-gray-400` }) }),
          /* @__PURE__ */ jsx("h3", { className: `${isMobile ? "text-base" : "text-lg"} font-medium text-gray-800 mb-2`, children: "Start Your Hunt" }),
          /* @__PURE__ */ jsx("p", { className: `text-gray-600 ${isMobile ? "text-sm" : "text-sm"}`, children: "Search for any item above to find the best boxes to win it cost-effectively" })
        ] })
      ] }) })
    }
  );
};
const calculateTotalItemsCount = (boxesData) => {
  if (!boxesData || boxesData.length === 0) return 0;
  return boxesData.reduce((total, box) => {
    if (!box.all_items || !Array.isArray(box.all_items)) return total;
    return total + box.all_items.length;
  }, 0);
};
const formatItemCount = (count2) => {
  if (count2 < 1e3) return count2.toString();
  if (count2 < 1e6) return `${(count2 / 1e3).toFixed(1)}K`;
  return `${(count2 / 1e6).toFixed(1)}M`;
};
const formatBoxCount = (count2) => {
  if (count2 < 1e3) return count2.toLocaleString();
  if (count2 < 1e6) return `${(count2 / 1e3).toFixed(1)}K`;
  return `${(count2 / 1e6).toFixed(1)}M`;
};
const CompactStats = ({ boxesData, loading = false }) => {
  const totalBoxes = boxesData.length;
  const totalItems = calculateTotalItemsCount(boxesData);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 py-2 px-3 max-w-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-purple-100 rounded-lg animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 w-16 bg-gray-200 rounded animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 w-20 bg-gray-200 rounded animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-gray-200" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-purple-100 rounded-lg animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 w-16 bg-gray-200 rounded animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 w-20 bg-gray-200 rounded animate-pulse" })
        ] })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "flex items-center justify-center gap-3 py-2 px-3 max-w-xs",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.2 },
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "flex items-center gap-2",
            whileHover: { scale: 1.02 },
            transition: { type: "spring", stiffness: 300 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(Package, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: formatBoxCount(totalBoxes) }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 font-medium", children: "Mystery Boxes" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-gray-300" }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "flex items-center gap-2",
            whileHover: { scale: 1.02 },
            transition: { type: "spring", stiffness: 300 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: formatItemCount(totalItems) }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 font-medium", children: "Items Indexed" })
              ] })
            ]
          }
        )
      ]
    }
  ) });
};
const searchItems = (boxesData, query) => {
  console.log("searchItems called with:", { query, boxesDataLength: boxesData.length });
  if (!query || query.length < 2) {
    console.log("Query too short or empty");
    return [];
  }
  const results = /* @__PURE__ */ new Set();
  const lowerQuery = query.toLowerCase();
  console.log("Starting search for:", lowerQuery);
  boxesData.forEach((box, boxIndex) => {
    if (box.all_items && Array.isArray(box.all_items)) {
      console.log(`Searching in box ${boxIndex}: ${box.box_name}, items count: ${box.all_items.length}`);
      box.all_items.forEach((item, itemIndex) => {
        if (item.name && item.name.toLowerCase().includes(lowerQuery)) {
          console.log(`Found matching item: ${item.name} in box: ${box.box_name}`);
          results.add(item.name);
        }
      });
    } else {
      console.log(`Box ${boxIndex} has no all_items or it's not an array:`, box.all_items);
    }
  });
  const finalResults = Array.from(results).slice(0, 10);
  console.log("Search completed. Found items:", finalResults);
  return finalResults;
};
const generateHuntReport = (boxesData, itemName) => {
  console.log("generateHuntReport called for item:", itemName);
  const results = [];
  boxesData.forEach((box) => {
    if (box.all_items && Array.isArray(box.all_items)) {
      const targetItem = box.all_items.find(
        (item) => item.name === itemName
      );
      if (targetItem && targetItem.drop_chance > 0) {
        const targetingCost = box.box_price / (targetItem.drop_chance / 100);
        console.log(`Found target item in box: ${box.box_name}, targeting cost: ${targetingCost}`);
        results.push({
          box,
          targetItem,
          targetingCost,
          rank: 0,
          // Will be set after sorting
          efficiency: targetingCost < 500 ? "Excellent" : targetingCost < 1e3 ? "Good" : "Poor"
        });
      }
    }
  });
  results.sort((a, b) => a.targetingCost - b.targetingCost);
  results.forEach((result, index) => {
    result.rank = index + 1;
  });
  console.log("Hunt report generated with", results.length, "results");
  return results;
};
const adaptUnifiedBoxToRillaBox = (unifiedBox) => {
  return {
    box_name: unifiedBox.box_name,
    box_price: unifiedBox.box_price,
    box_image: unifiedBox.box_image,
    expected_value_percent_of_price: unifiedBox.expected_value_percent_of_price,
    volatility_bucket: unifiedBox.volatility_bucket,
    standard_deviation_percent: unifiedBox.standard_deviation_percent,
    floor_rate_percent: unifiedBox.floor_rate_percent,
    category: unifiedBox.category,
    tags: unifiedBox.tags,
    jackpot_items: unifiedBox.jackpot_items,
    unwanted_items: unifiedBox.unwanted_items,
    all_items: unifiedBox.all_items,
    provider: unifiedBox.provider
  };
};
const adaptUnifiedBoxesToRillaBoxes = (unifiedBoxes) => {
  return unifiedBoxes.map(adaptUnifiedBoxToRillaBox);
};
const useItemSearch = (boxesData) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const adaptedBoxes = adaptUnifiedBoxesToRillaBoxes(boxesData);
      const results = searchItems(adaptedBoxes, query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [boxesData]);
  const handleItemSelect = useCallback((itemName) => {
    setSelectedItem(itemName);
    setSearchQuery(itemName);
    setSearchResults([]);
  }, []);
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedItem("");
  }, []);
  return {
    searchQuery,
    searchResults,
    selectedItem,
    handleSearch,
    handleItemSelect,
    handleClearSearch
  };
};
const useHuntReport = (boxesData, selectedItem) => {
  return useMemo(() => {
    if (!selectedItem) return [];
    const adaptedBoxes = adaptUnifiedBoxesToRillaBoxes(boxesData);
    return generateHuntReport(adaptedBoxes, selectedItem);
  }, [boxesData, selectedItem]);
};
const Hub = () => {
  const [searchParams] = useSearchParams();
  const [showAlert, setShowAlert] = useState(true);
  useState("");
  const isMobile = useIsMobile();
  const providerParam = searchParams.get("provider");
  const {
    summaryData,
    boxesData,
    loading,
    error
  } = useUnifiedBoxData(void 0, 2e3);
  const {
    searchQuery,
    searchResults,
    selectedItem,
    handleSearch,
    handleItemSelect,
    handleClearSearch
  } = useItemSearch(boxesData);
  const huntResults = useHuntReport(boxesData, selectedItem);
  const getItemImage = (itemName) => {
    for (const box of boxesData) {
      const allItems = [...box.jackpot_items, ...box.unwanted_items, ...box.all_items];
      const item = allItems.find((item2) => item2.name === itemName);
      if (item == null ? void 0 : item.image) {
        return item.image;
      }
    }
    return "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop";
  };
  console.log("Hub component render:", {
    providerParam,
    summaryData,
    boxesCount: boxesData.length,
    loading,
    error
  });
  if (error) {
    return /* @__PURE__ */ jsx(DotBackground, { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-red-600 text-xl", children: [
        "Error loading mystery box data: ",
        error
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => window.location.reload(), className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300", children: "Retry" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Mystery Box Hub - Compare Drop Rates & Expected Values | Unpacked.gg" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Compare mystery box drop rates, expected values, and volatility across RillaBox, Hypedrop, Cases.GG, and Luxdrop. Find the most profitable mystery boxes with comprehensive analytics." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "mystery boxes, drop rates, expected value, RillaBox, Hypedrop, Cases.GG, Luxdrop, unboxing, case opening, gambling analytics" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Mystery Box Analytics Hub | Unpacked.gg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Find the best mystery boxes with comprehensive drop rate analysis and expected value calculations across multiple providers." }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://unpacked.gg/hub" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Mystery Box Analytics Hub | Unpacked.gg" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Compare mystery box drop rates and expected values across multiple providers. Find profitable boxes with detailed analytics." }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://unpacked.gg/hub" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Unpacked.gg",
        "url": "https://unpacked.gg",
        "description": "Mystery box analytics platform for comparing drop rates and expected values",
        "sameAs": []
      }) })
    ] }),
    /* @__PURE__ */ jsxs(DotBackground, { className: "min-h-screen", children: [
      showAlert && /* @__PURE__ */ jsx("div", { className: "mx-4 sm:mx-6 mt-4 sm:mt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(Alert, { className: "bg-blue-50 border-blue-200 text-blue-800", children: [
          /* @__PURE__ */ jsx(Info, { className: "h-4 w-4 text-blue-600" }),
          /* @__PURE__ */ jsx(AlertDescription, { className: "text-sm leading-relaxed text-blue-800 pr-10", children: "We gather this information and data to the best of our knowledge to provide value, but we cannot guarantee that the data is always accurate." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowAlert(false),
            className: "absolute top-1.5 right-1.5 p-1.5 rounded-full text-gray-600 hover:text-gray-800 hover:bg-blue-100 transition-colors flex items-center justify-center w-7 h-7",
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-12 md:space-y-16", children: [
        /* @__PURE__ */ jsxs("header", { className: "text-center space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-center ${isMobile ? "gap-3" : "gap-6"}`, children: [
            /* @__PURE__ */ jsx("img", { src: "/images/208a85a9-4108-4646-8cb0-aed2a05655ab.png", alt: "Unpacked.gg Logo", className: `object-contain ${isMobile ? "h-20" : "h-32"}` }),
            /* @__PURE__ */ jsx("div", { className: `${isMobile ? "w-3" : "w-1"} bg-black ${isMobile ? "h-20" : "h-32"} shadow-[0_0_4px_rgba(255,255,255,0.8)]` }),
            /* @__PURE__ */ jsx("span", { className: `font-bold text-gray-800 ${isMobile ? "text-3xl" : "text-5xl"}`, children: "Hub" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent leading-[1.2] pb-2", children: "Online Mystery Boxes – Find Yours" }) }),
            /* @__PURE__ */ jsx("div", { className: "inline-block mx-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg shadow-purple-500/10 px-4 py-2", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700 font-semibold leading-relaxed", children: "Unbox the Best Mystery Boxes – Don't Settle for Poor Drop Rates" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "inline-block bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg shadow-purple-500/10 px-4 py-2", children: /* @__PURE__ */ jsx("p", { className: "text-base text-gray-700 leading-relaxed", children: "Discover profitable mystery boxes with comprehensive analytics. Compare expected values, drop rates, and volatility across multiple providers." }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-fit mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-purple-50 via-white to-blue-50 backdrop-blur-md rounded-2xl border border-purple-200/50 shadow-2xl shadow-purple-500/20 ring-1 ring-purple-100/50 p-1 animate-pulse-subtle", children: /* @__PURE__ */ jsx("div", { className: "bg-white/40 backdrop-blur-sm rounded-xl", children: /* @__PURE__ */ jsx(CompactStats, { boxesData, loading }) }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-2xl blur-xl -z-10" })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Item Hunter - Find Mystery Boxes with Your Target Items" }),
          /* @__PURE__ */ jsx(HuntExperience, { searchQuery, searchResults, selectedItem, huntResults, onSearchChange: handleSearch, onItemSelect: handleItemSelect, onClearSearch: handleClearSearch, getItemImage })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Mystery Box Analytics & Statistics" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: loading ? (
            // Show skeleton cards while loading
            /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(SkeletonStatsCard, {}),
              /* @__PURE__ */ jsx(SkeletonStatsCard, {}),
              /* @__PURE__ */ jsx(SkeletonStatsCard, {}),
              /* @__PURE__ */ jsx(SkeletonStatsCard, {})
            ] })
          ) : (
            // Show actual data once loaded
            summaryData && /* @__PURE__ */ jsx(BoxfolioDashboard, { summaryData, boxesData, isUnified: true, showOnlyStats: true, selectedProvider: providerParam })
          ) })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6 text-center", children: "Browse All Mystery Boxes" }),
          loading ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white/50 backdrop-blur-sm rounded-lg p-4 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 rounded animate-pulse" }) }),
              /* @__PURE__ */ jsx("div", { className: "w-48", children: /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 rounded animate-pulse" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: Array.from({
              length: 12
            }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-40 bg-gray-200 rounded-lg" }),
              /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded w-3/4" }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded w-16" }),
                /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded w-12" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded w-20 mx-auto" })
            ] }) }, index)) })
          ] }) : summaryData && /* @__PURE__ */ jsx(BoxfolioDashboard, { summaryData, boxesData, isUnified: true, showOnlyContent: true, selectedProvider: providerParam })
        ] })
      ] }) })
    ] })
  ] });
};
const safeParseJSON = (jsonData) => {
  if (!jsonData) return [];
  if (Array.isArray(jsonData)) {
    return jsonData.map((item) => {
      let dropChance = 0;
      if (item.item_dropchance_formatted) {
        const formatted = item.item_dropchance_formatted.toString().replace("%", "");
        dropChance = parseFloat(formatted) / 100;
      } else if (item.item_dropchance !== void 0) {
        const rawDropChance = parseFloat(item.item_dropchance);
        dropChance = rawDropChance / 100;
        console.log(`Converting drop chance: ${rawDropChance}% -> ${dropChance} (decimal)`);
      } else if (item.drop_chance !== void 0) {
        const rawDropChance = parseFloat(item.drop_chance);
        dropChance = rawDropChance / 100;
        console.log(`Converting drop chance: ${rawDropChance}% -> ${dropChance} (decimal)`);
      }
      if (isNaN(dropChance) || dropChance < 0 || dropChance > 1) {
        console.warn(`Invalid drop chance for item "${item.item_name || item.name}": ${dropChance}, setting to 0`);
        dropChance = 0;
      }
      let value = 0;
      if (item.item_value !== void 0) {
        value = parseFloat(item.item_value);
      } else if (item.value !== void 0) {
        value = parseFloat(item.value);
      } else if (item.price !== void 0) {
        value = parseFloat(item.price);
      }
      if (isNaN(value) || value < 0) {
        console.warn(`Invalid value for item "${item.item_name || item.name}": ${value}, setting to 0`);
        value = 0;
      }
      const parsedItem = {
        name: item.item_name || item.name || "Unknown Item",
        value,
        drop_chance: dropChance,
        image: item.item_image || item.image || "",
        type: item.type || item.item_type || ""
      };
      console.log(`Parsed item: ${parsedItem.name}, Value: $${parsedItem.value}, Drop: ${(parsedItem.drop_chance * 100).toFixed(4)}%`);
      return parsedItem;
    });
  }
  if (typeof jsonData === "string") {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        return safeParseJSON(parsed);
      }
    } catch (e) {
      console.warn("Failed to parse JSON string:", e);
    }
  }
  return [];
};
const parseTagsArray = (tagsData) => {
  if (!tagsData) return [];
  if (Array.isArray(tagsData)) {
    return tagsData.filter((tag) => tag && typeof tag === "string");
  }
  if (typeof tagsData === "string") {
    try {
      const parsed = JSON.parse(tagsData);
      if (Array.isArray(parsed)) {
        return parsed.filter((tag) => tag && typeof tag === "string");
      }
    } catch (e) {
      return tagsData.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
    }
  }
  return [];
};
const fetchBoxDetail = async (boxSlug) => {
  var _a2;
  console.log(`Enhanced search for box with slug: ${boxSlug} across all providers...`);
  const normalizedSlug = normalizeString(boxSlug);
  console.log(`Normalized search slug: ${normalizedSlug}`);
  const searchPromises = Object.entries(PROVIDER_CONFIGS).map(async ([providerId, config]) => {
    try {
      const { data, error } = await supabase.from(config.tableName).select("*").limit(1e3);
      if (error) {
        console.error(`Error fetching from ${config.displayName}:`, error);
        return [];
      }
      if (!data || data.length === 0) {
        console.log(`No data found in ${config.displayName}`);
        return [];
      }
      console.log(`Found ${data.length} boxes in ${config.displayName}, starting intelligent matching...`);
      const boxNames = data.map((box) => box.box_name).filter(Boolean);
      const matches = findBestMatches(normalizedSlug, boxNames);
      console.log(`${config.displayName} matches:`, matches.slice(0, 3));
      return matches.filter((match) => match.score > 0.4).slice(0, 5).map((match) => {
        const originalBox = data.find((box) => box.box_name === match.originalName);
        return {
          ...originalBox,
          provider: providerId,
          provider_config: config,
          matchScore: match.score,
          matchedSlug: match.slug
        };
      }).filter(Boolean);
    } catch (error) {
      console.error(`Search error in ${config.displayName}:`, error);
      return [];
    }
  });
  const allResults = await Promise.all(searchPromises);
  const allMatches = allResults.flat().filter(Boolean).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  console.log(`Total matches found: ${allMatches.length}`);
  if (allMatches.length > 0) {
    console.log(`Best match: ${allMatches[0].box_name} (score: ${(_a2 = allMatches[0].matchScore) == null ? void 0 : _a2.toFixed(3)}) from ${allMatches[0].provider_config.displayName}`);
  }
  const foundBox = allMatches[0] || null;
  if (!foundBox) {
    console.log(`No suitable matches found for slug: ${boxSlug}`);
    return null;
  }
  const parsedJackpotItems = safeParseJSON(foundBox.jackpot_items);
  const parsedUnwantedItems = safeParseJSON(foundBox.unwanted_items);
  const parsedAllItems = safeParseJSON(foundBox.all_items);
  const totalDropRate = parsedAllItems.reduce((sum, item) => sum + item.drop_chance, 0);
  console.log(`Box "${foundBox.box_name}" total drop rate: ${(totalDropRate * 100).toFixed(2)}%`);
  if (totalDropRate < 0.95 || totalDropRate > 1.05) {
    console.warn(`Warning: Drop rates for "${foundBox.box_name}" sum to ${(totalDropRate * 100).toFixed(2)}%, expected ~100%`);
  }
  return {
    box_name: foundBox.box_name || "Unknown Mystery Box",
    box_price: Number(foundBox.box_price) || 0,
    box_image: foundBox.box_image || "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
    expected_value_percent_of_price: Number(foundBox.expected_value_percent) || 0,
    volatility_bucket: foundBox.volatility_bucket || "Medium",
    standard_deviation_percent: Number(foundBox.standard_deviation_percent) || 0,
    floor_rate_percent: Number(foundBox.floor_rate_percent) || 0,
    category: foundBox.category || "Mystery Boxes",
    tags: parseTagsArray(foundBox.tags),
    jackpot_items: parsedJackpotItems,
    unwanted_items: parsedUnwantedItems,
    all_items: parsedAllItems,
    provider: foundBox.provider,
    provider_config: foundBox.provider_config
  };
};
const useBoxDetail = (boxSlug) => {
  const {
    data: boxData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["boxDetail", boxSlug],
    queryFn: () => fetchBoxDetail(boxSlug),
    enabled: Boolean(boxSlug),
    staleTime: 5 * 60 * 1e3,
    // 5 minutes
    gcTime: 10 * 60 * 1e3,
    // 10 minutes (was cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4)
  });
  return {
    boxData,
    loading: isLoading,
    error: (error == null ? void 0 : error.message) || null,
    refetch
  };
};
const useBoxSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const findSuggestions = useCallback(async (searchSlug) => {
    if (!searchSlug || searchSlug.length < 2) return [];
    setLoading(true);
    console.log(`Finding suggestions for: ${searchSlug}`);
    try {
      const searchPromises = Object.entries(PROVIDER_CONFIGS).map(async ([providerId, config]) => {
        try {
          const { data, error } = await supabase.from(config.tableName).select("box_name").limit(200);
          if (error || !data) {
            console.error(`Error fetching suggestions from ${config.displayName}:`, error);
            return [];
          }
          const boxNames = data.map((box) => box.box_name).filter(Boolean);
          const matches = findBestMatches(searchSlug, boxNames);
          return matches.filter((match) => match.score > 0.2 && match.score < 0.9).slice(0, 3).map((match) => ({
            box_name: match.originalName,
            provider: providerId,
            provider_name: config.displayName,
            slug: match.slug,
            score: match.score
          }));
        } catch (error) {
          console.error(`Suggestion error in ${config.displayName}:`, error);
          return [];
        }
      });
      const allSuggestions = (await Promise.all(searchPromises)).flat().sort((a, b) => b.score - a.score).slice(0, 6);
      setSuggestions(allSuggestions);
      return allSuggestions;
    } catch (error) {
      console.error("Error finding suggestions:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    suggestions,
    loading,
    findSuggestions
  };
};
const calculateBreakEvenOdds = (items, boxPrice) => {
  if (!items || items.length === 0 || boxPrice <= 0) return 0;
  const breakEvenItems = items.filter((item) => (item.value || 0) >= boxPrice);
  const breakEvenChance = breakEvenItems.reduce((sum, item) => sum + (item.drop_chance || 0), 0);
  console.log(`Break-even items count: ${breakEvenItems.length}, Total break-even chance: ${(breakEvenChance * 100).toFixed(4)}%`);
  return breakEvenChance * 100;
};
const calculateCategoryStats = (items, boxPrice) => {
  if (!items || items.length === 0) {
    return {
      totalDropRate: 0,
      evContribution: 0,
      evContributionDollars: 0,
      oddsToEvRatio: 0,
      averageValue: 0,
      maxValue: 0,
      minValue: 0,
      itemCount: 0,
      breakEvenOdds: 0
    };
  }
  const totalDropRate = items.reduce((sum, item) => sum + (item.drop_chance || 0), 0);
  const evContributionDollars = items.reduce((sum, item) => {
    const itemEV = (item.value || 0) * (item.drop_chance || 0);
    console.log(`Item: ${item.name}, Value: $${item.value}, Drop Rate: ${(item.drop_chance * 100).toFixed(4)}%, EV Contribution: $${itemEV.toFixed(4)}`);
    return sum + itemEV;
  }, 0);
  console.log(`Category EV Contribution Total: $${evContributionDollars.toFixed(4)}`);
  const evContribution = boxPrice > 0 ? evContributionDollars / boxPrice * 100 : 0;
  const oddsToEvRatio = evContribution > 0 ? totalDropRate * 100 / evContribution : 0;
  const values = items.map((item) => item.value || 0).filter((v) => v > 0);
  const averageValue = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const breakEvenOdds = calculateBreakEvenOdds(items, boxPrice);
  return {
    totalDropRate,
    evContribution,
    evContributionDollars,
    oddsToEvRatio,
    averageValue,
    maxValue,
    minValue,
    itemCount: items.length,
    breakEvenOdds
  };
};
const calculateLossChance = (allItems, boxPrice) => {
  if (!allItems || allItems.length === 0 || boxPrice <= 0) {
    console.warn("Loss chance calculation: Invalid input data");
    return 100;
  }
  console.log(`Loss chance calculation for box price: $${boxPrice}`);
  console.log(`Total items to analyze: ${allItems.length}`);
  const validItems = allItems.filter((item) => {
    const hasValidDropChance = typeof item.drop_chance === "number" && !isNaN(item.drop_chance) && item.drop_chance >= 0;
    const hasValidValue = typeof item.value === "number" && !isNaN(item.value) && item.value >= 0;
    if (!hasValidDropChance) {
      console.warn(`Item "${item.name}" has invalid drop chance:`, item.drop_chance);
    }
    if (!hasValidValue) {
      console.warn(`Item "${item.name}" has invalid value:`, item.value);
    }
    return hasValidDropChance && hasValidValue;
  });
  console.log(`Valid items after filtering: ${validItems.length}`);
  if (validItems.length === 0) {
    console.warn("No valid items found for loss chance calculation");
    return 100;
  }
  const totalDropRate = validItems.reduce((sum, item) => sum + item.drop_chance, 0);
  console.log(`Total drop rate sum: ${(totalDropRate * 100).toFixed(4)}%`);
  if (totalDropRate < 0.95 || totalDropRate > 1.05) {
    console.warn(`Warning: Drop rates sum to ${(totalDropRate * 100).toFixed(2)}%, expected ~100%`);
  }
  const losingItems = validItems.filter((item) => item.value < boxPrice);
  const losingChance = losingItems.reduce((sum, item) => sum + item.drop_chance, 0);
  const profitItems = validItems.filter((item) => item.value >= boxPrice);
  const profitChance = profitItems.reduce((sum, item) => sum + item.drop_chance, 0);
  const alternativeLossChance = Math.max(0, totalDropRate - profitChance);
  console.log(`Losing items count: ${losingItems.length}`);
  console.log(`Profit items count: ${profitItems.length}`);
  console.log(`Direct loss chance: ${(losingChance * 100).toFixed(4)}%`);
  console.log(`Alternative loss chance (100% - profit): ${(alternativeLossChance * 100).toFixed(4)}%`);
  let finalLossChance = losingChance;
  if (profitItems.length === validItems.length && profitItems.length > 0) {
    console.log("All items are profitable, setting loss chance to 0%");
    finalLossChance = 0;
  } else if (Math.abs(losingChance - alternativeLossChance) > 0.1) {
    console.warn("Large discrepancy between calculation methods, using alternative");
    finalLossChance = alternativeLossChance;
  }
  if (totalDropRate > 0 && (totalDropRate < 0.95 || totalDropRate > 1.05)) {
    console.log("Normalizing loss chance due to drop rate sum != 100%");
    finalLossChance = finalLossChance / totalDropRate;
  }
  const result = Math.min(Math.max(finalLossChance * 100, 0), 100);
  console.log(`Final loss chance: ${result.toFixed(2)}%`);
  return result;
};
const CategoryStatsCard = ({ stats, title, type }) => {
  const formatPercentage = (value) => {
    if (value >= 1) return `${value.toFixed(1)}%`;
    if (value >= 0.1) return `${value.toFixed(2)}%`;
    if (value >= 0.01) return `${value.toFixed(3)}%`;
    if (value >= 1e-3) return `${value.toFixed(4)}%`;
    return `${value.toFixed(5)}%`;
  };
  const formatRatio = (value) => {
    if (value >= 1) return `${value.toFixed(1)}x`;
    if (value >= 0.1) return `${value.toFixed(2)}x`;
    if (value >= 0.01) return `${value.toFixed(3)}x`;
    if (value >= 1e-3) return `${value.toFixed(4)}x`;
    if (value >= 1e-4) return `${value.toFixed(5)}x`;
    return `${value.toFixed(6)}x`;
  };
  const getEVGradient = (ev) => {
    if (ev > 10) return "bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent";
    if (ev > 5) return "bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent";
    return "bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent";
  };
  const getRatioGradient = (ratio) => {
    if (ratio > 1) return "bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent";
    if (ratio > 0.5) return "bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent";
    return "bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent";
  };
  const getOddsGradient = (odds) => {
    return "bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent";
  };
  const getCardGlow = (type2) => {
    if (type2 === "jackpot") {
      return "shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 border-purple-500/20 hover:border-purple-500/40";
    }
    return "shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 border-purple-500/20 hover:border-purple-500/40";
  };
  const isCommonItems = type === "common";
  const categoryLabel = type === "jackpot" ? "Jackpot Items" : "Common Items";
  return /* @__PURE__ */ jsx(Card, { className: `
      bg-white/20 backdrop-blur-md border mb-3 rounded-xl shadow-lg isolate
      transition-all duration-300 hover:scale-[1.02] hover:bg-white/30 motion-reduce:hover:scale-100
      ${getCardGlow(type)}
      glass-edge
    `, children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: `grid gap-2 text-xs ${isCommonItems ? "grid-cols-3" : "grid-cols-3"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold text-lg ${getOddsGradient(stats.totalDropRate * 100)} 
              transition-all duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100`, children: formatPercentage(stats.totalDropRate * 100) }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-xs font-medium", children: [
          categoryLabel,
          " Drop Odds"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
        /* @__PURE__ */ jsxs("div", { className: `font-bold text-lg ${getEVGradient(stats.evContribution)}
              transition-all duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100 drop-shadow-sm`, children: [
          stats.evContribution.toFixed(1),
          "%"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-xs font-medium", children: [
          categoryLabel,
          " EV Share"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold text-lg ${getRatioGradient(stats.oddsToEvRatio)}
              transition-all duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100 drop-shadow-sm`, children: formatRatio(stats.oddsToEvRatio) }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs font-medium", children: "Odds/EV Ratio" })
      ] })
    ] }),
    stats.itemCount > 0 && /* @__PURE__ */ jsx("div", { className: "mt-3 pt-2 border-t border-white/10", children: /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-gray-700", children: /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
      categoryLabel,
      " Value Range: ",
      /* @__PURE__ */ jsxs("span", { className: "text-gray-900", children: [
        formatCompactCurrency(stats.minValue),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "-" }),
        " ",
        formatCompactCurrency(stats.maxValue)
      ] })
    ] }) }) })
  ] }) });
};
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const BoxDetailContent = ({ box }) => {
  var _a2;
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  const providerLinks = {
    "hypedrop": "https://unpacked.gg/go/hypedrop",
    "rillabox": "https://unpacked.gg/go/rillabox",
    "casesgg": "https://unpacked.gg/go/cases-gg",
    "luxdrop": "https://unpacked.gg/go/luxdrop"
  };
  const providerReviewLinks = {
    "hypedrop": "https://unpacked.gg/mystery-boxes/hypedrop-review/",
    "rillabox": "https://unpacked.gg/mystery-boxes/rillabox-review/",
    "casesgg": "https://unpacked.gg/mystery-boxes/cases-gg-review/",
    "luxdrop": "https://unpacked.gg/mystery-boxes/luxdrop-review/"
  };
  const getVolatilityGradient = (volatilityPercent2) => {
    if (volatilityPercent2 >= 80) return "text-purple-700 font-bold";
    if (volatilityPercent2 >= 50) return "text-purple-600 font-bold";
    if (volatilityPercent2 >= 20) return "text-purple-500 font-bold";
    return "text-purple-400 font-bold";
  };
  const getFloorRateColor = (floorRate) => {
    if (floorRate >= 80) return "text-green-600 font-bold";
    if (floorRate >= 60) return "text-green-500 font-bold";
    if (floorRate >= 40) return "text-orange-500 font-bold";
    if (floorRate >= 20) return "text-red-500 font-bold";
    return "text-red-600 font-bold";
  };
  const getEVGradient = (ev) => {
    if (ev > 100) return "text-green-600 font-bold";
    if (ev > 75) return "text-green-500 font-bold";
    if (ev > 50) return "text-orange-500 font-bold";
    return "text-red-600 font-bold";
  };
  const formatDropRate = (dropChance) => {
    if (!dropChance || isNaN(dropChance)) return "0%";
    const percentage = dropChance * 100;
    let formattedValue;
    if (percentage >= 1) {
      formattedValue = percentage.toFixed(1);
    } else if (percentage >= 0.1) {
      formattedValue = percentage.toFixed(2);
    } else if (percentage >= 0.01) {
      formattedValue = percentage.toFixed(3);
    } else if (percentage >= 1e-3) {
      formattedValue = percentage.toFixed(4);
    } else if (percentage >= 1e-4) {
      formattedValue = percentage.toFixed(5);
    } else {
      formattedValue = percentage.toFixed(6);
    }
    formattedValue = parseFloat(formattedValue).toString();
    return `${formattedValue}%`;
  };
  const volatilityPercent = box.standard_deviation_percent || 0;
  const floorPercent = box.floor_rate_percent || 0;
  const sortedAllItems = useMemo(() => {
    return [...box.all_items].sort((a, b) => {
      if (a.drop_chance !== b.drop_chance) {
        return a.drop_chance - b.drop_chance;
      }
      return b.value - a.value;
    });
  }, [box.all_items]);
  const topJackpotItems = useMemo(() => {
    return [...box.all_items].sort((a, b) => a.drop_chance - b.drop_chance).slice(0, 3);
  }, [box.all_items]);
  const topCommonItems = useMemo(() => {
    return [...box.all_items].sort((a, b) => b.drop_chance - a.drop_chance).slice(0, 3);
  }, [box.all_items]);
  const jackpotStats = useMemo(
    () => calculateCategoryStats(topJackpotItems, box.box_price),
    [topJackpotItems, box.box_price]
  );
  const commonStats = useMemo(
    () => calculateCategoryStats(topCommonItems, box.box_price),
    [topCommonItems, box.box_price]
  );
  const lossChance = useMemo(
    () => calculateLossChance(box.all_items, box.box_price),
    [box.all_items, box.box_price]
  );
  return /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("h1", { className: `${isMobile ? "text-2xl" : "text-4xl"} font-bold text-gray-800`, children: box.box_name }),
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-center gap-3 ${isMobile ? "flex-col" : "flex-row"}`, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => window.open(providerLinks[box.provider || "rillabox"], "_blank"),
            className: "flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-all duration-200 cursor-pointer group",
            title: "Visit provider website",
            children: [
              /* @__PURE__ */ jsx(
                ProviderLogo,
                {
                  providerId: box.provider || "rillabox",
                  size: isMobile ? "sm" : "md",
                  enhanced: true,
                  className: "transition-transform duration-200 hover:scale-[1.4] group-hover:scale-[1.2]"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: `${isMobile ? "text-lg" : "text-xl"} font-bold text-purple-600 group-hover:text-purple-800 transition-colors duration-200`, children: ((_a2 = PROVIDER_CONFIGS[box.provider || "rillabox"]) == null ? void 0 : _a2.displayName) || "RillaBox" }),
              /* @__PURE__ */ jsx(ExternalLink, { className: `${isMobile ? "h-4 w-4" : "h-5 w-5"} transform rotate-45 text-purple-600 group-hover:text-purple-800 group-hover:scale-110 transition-all duration-200` })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: isMobile ? "sm" : "default",
            onClick: () => window.open(providerReviewLinks[box.provider || "rillabox"], "_blank"),
            className: "gap-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-400 transition-all duration-200",
            children: [
              /* @__PURE__ */ jsx(Star, { className: `${isMobile ? "h-4 w-4" : "h-5 w-5"}` }),
              /* @__PURE__ */ jsx("span", { className: isMobile ? "text-sm" : "text-base", children: "Read Review" }),
              /* @__PURE__ */ jsx(ExternalLink, { className: `${isMobile ? "h-3 w-3" : "h-4 w-4"}` })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `grid ${isMobile ? "grid-cols-1" : "md:grid-cols-2"} ${isMobile ? "gap-4" : "gap-6"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `w-full ${isMobile ? "h-48" : "h-64"} rounded-xl overflow-hidden p-4 shadow-lg border border-purple-200 relative cursor-pointer`,
            style: {
              backgroundImage: `url('/images/90a8beae-8a8c-4f9a-bfd2-d7dc5be9de82.png')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-referrer",
              backgroundPosition: "center",
              backgroundBlendMode: "soft-light"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/70 backdrop-blur-[0.5px] rounded-xl" }),
              !imageLoaded && /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gray-200 animate-pulse rounded relative z-10" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: box.box_image,
                  alt: box.box_name,
                  className: `w-full h-full object-contain relative z-10 transition-transform duration-300 hover:scale-[1.02] transform-origin-center overflow-visible cursor-default ${imageLoaded ? "opacity-100" : "opacity-0"}`,
                  referrerPolicy: "no-referrer",
                  onLoad: () => setImageLoaded(true)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: `grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} gap-4`, children: [
          /* @__PURE__ */ jsxs("div", { className: `text-center ${isMobile ? "p-3" : "p-4"} bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200`, children: [
            /* @__PURE__ */ jsx("div", { className: `${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-800`, children: formatBoxPrice(box.box_price) }),
            /* @__PURE__ */ jsx("div", { className: `${isMobile ? "text-xs" : "text-sm"} text-gray-600 font-medium`, children: "Mystery Box Price" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `text-center ${isMobile ? "p-3" : "p-4"} bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200`, children: [
            /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-lg" : "text-xl"} ${getEVGradient(box.expected_value_percent_of_price)}`, children: [
              box.expected_value_percent_of_price.toFixed(1),
              "% (EV)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-xs" : "text-sm"} text-gray-600 font-medium flex items-center justify-center gap-1`, children: [
              "Expected Value",
              !isMobile && /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-3 w-3 text-gray-400" }) }),
                /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Statistical average return on investment" }) })
              ] })
            ] })
          ] }),
          !isMobile && /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200", children: [
            /* @__PURE__ */ jsxs("div", { className: `text-xl ${getVolatilityGradient(volatilityPercent)}`, children: [
              volatilityPercent.toFixed(1),
              "%"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 font-medium flex items-center justify-center gap-1", children: [
              "Volatility",
              /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-3 w-3 text-gray-400" }) }),
                /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Measure of risk and unpredictability" }) })
              ] })
            ] })
          ] })
        ] }),
        isMobile && /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200", children: [
          /* @__PURE__ */ jsxs("div", { className: `text-lg ${getVolatilityGradient(volatilityPercent)}`, children: [
            volatilityPercent.toFixed(1),
            "% Volatility"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600 font-medium", children: "Measure of risk and unpredictability" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: isMobile ? "space-y-4" : "flex gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "w-full" : "flex-[2]"} ${isMobile ? "p-3" : "p-4"} bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 flex flex-col`, children: [
            /* @__PURE__ */ jsx("h4", { className: `${isMobile ? "text-sm" : "text-sm"} font-medium text-gray-700 mb-3`, children: "All Tags" }),
            /* @__PURE__ */ jsx(
              ScrollableContainer,
              {
                maxHeight: isMobile ? "max-h-24" : "max-h-36",
                className: "w-full",
                showIndicators: true,
                children: /* @__PURE__ */ jsx("div", { className: `${isMobile ? "flex flex-wrap gap-2 px-1 pt-3" : "grid grid-cols-2 gap-2 px-3 pt-3"}`, children: box.tags.map((tag) => /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `bg-white border-purple-300 text-purple-700 ${isMobile ? "text-xs px-2 py-1" : "text-xs"} justify-center h-fit py-1.5`,
                    children: capitalizeFirstLetter(tag)
                  },
                  tag
                )) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4 flex-1"}`, children: [
            /* @__PURE__ */ jsxs("div", { className: `text-center ${isMobile ? "p-3" : "p-4"} bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200`, children: [
              /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-base" : "text-lg"} ${getFloorRateColor(floorPercent)}`, children: [
                floorPercent.toFixed(1),
                "%"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-xs" : "text-xs"} text-gray-600 font-medium flex items-center justify-center gap-1`, children: [
                "Floor Rate",
                !isMobile && /* @__PURE__ */ jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-3 w-3 text-gray-400" }) }),
                  /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Lowest item value as percentage of box price" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `text-center ${isMobile ? "p-3" : "p-4"} bg-purple-50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200`, children: [
              /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-base" : "text-lg"} font-bold text-red-600`, children: [
                lossChance.toFixed(1),
                "%"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-xs" : "text-xs"} text-gray-600 font-medium flex items-center justify-center gap-1`, children: [
                "Loss Chance",
                !isMobile && /* @__PURE__ */ jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-3 w-3 text-gray-400" }) }),
                  /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Probability of getting items worth less than box price" }) })
                ] })
              ] })
            ] })
          ] })
        ] }),
        sortedAllItems.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: `${isMobile ? "text-base" : "text-lg"} font-semibold mb-3 text-gray-800`, children: "All Items (by Drop Rate & Value)" }),
          /* @__PURE__ */ jsx(
            ScrollableContainer,
            {
              maxHeight: isMobile ? "max-h-60" : "max-h-80",
              className: "space-y-2",
              children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-3", children: [
                sortedAllItems.slice(0, 50).map((item, i) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `flex items-center gap-2 p-2 bg-purple-50 rounded border border-purple-200 mb-2
                                    ${isMobile ? "text-xs min-h-[44px] hover:scale-[1.02]" : "text-sm hover:scale-[1.03]"}
                                    transition-transform origin-center relative z-10 overflow-visible cursor-pointer`,
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsx("div", { className: `font-medium truncate text-gray-800 ${isMobile ? "text-xs" : ""}`, children: item.name }) }),
                      /* @__PURE__ */ jsx("div", { className: `text-purple-600 font-mono ${isMobile ? "text-xs" : "text-xs"}`, children: formatDropRate(item.drop_chance) }),
                      /* @__PURE__ */ jsx("div", { className: `text-purple-600 font-semibold ${isMobile ? "text-xs" : "text-xs"} min-w-0`, children: formatCurrency(item.value) })
                    ]
                  },
                  i
                )),
                sortedAllItems.length > 50 && /* @__PURE__ */ jsxs("div", { className: `text-center text-gray-500 ${isMobile ? "text-xs" : "text-sm"} py-2`, children: [
                  "...and ",
                  sortedAllItems.length - 50,
                  " more items"
                ] })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: `${isMobile ? "text-base" : "text-lg"} font-semibold mb-3 flex items-center gap-2 text-gray-800`, children: [
            /* @__PURE__ */ jsx(Star, { className: `${isMobile ? "h-4 w-4" : "h-5 w-5"} text-purple-500` }),
            "Jackpot Items",
            !isMobile && /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 text-gray-400" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "High-value items with rare drop rates" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            CategoryStatsCard,
            {
              stats: jackpotStats,
              title: "Jackpot Items",
              type: "jackpot"
            }
          ),
          /* @__PURE__ */ jsx(
            ScrollableContainer,
            {
              maxHeight: topJackpotItems.length <= 3 ? "max-h-none" : isMobile ? "max-h-48" : "max-h-60",
              className: "space-y-2",
              showIndicators: topJackpotItems.length > 3,
              children: /* @__PURE__ */ jsx("div", { className: "px-2 pt-3", children: topJackpotItems && topJackpotItems.length > 0 ? topJackpotItems.map((item, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex items-center gap-2 p-2 bg-purple-50 rounded border border-purple-200 mb-2
                                    ${isMobile ? "min-h-[44px] hover:scale-[1.02]" : "hover:scale-[1.03]"}
                                    transition-transform origin-center relative z-10 overflow-visible cursor-pointer`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `${isMobile ? "w-10 h-10" : "w-12 h-12"} bg-purple-100 rounded flex items-center justify-center flex-shrink-0 p-1`, children: item.image ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: item.image,
                        alt: item.name,
                        className: "w-full h-full object-contain rounded",
                        loading: "lazy",
                        referrerPolicy: "no-referrer"
                      }
                    ) : /* @__PURE__ */ jsx(Star, { className: `${isMobile ? "w-3 h-3" : "w-4 h-4"} text-purple-500` }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("div", { className: `font-medium ${isMobile ? "text-xs" : "text-sm"} truncate text-gray-800`, children: item.name }),
                      /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-xs" : "text-xs"} text-purple-600 font-mono`, children: [
                        "Drop Rate: ",
                        formatDropRate(item.drop_chance)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: `text-purple-600 font-semibold ${isMobile ? "text-xs" : "text-sm"}`, children: formatCurrency(item.value) })
                  ]
                },
                i
              )) : /* @__PURE__ */ jsx("div", { className: `text-gray-500 text-center py-4 ${isMobile ? "text-sm" : ""}`, children: "No jackpot items available" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: `${isMobile ? "text-base" : "text-lg"} font-semibold mb-3 flex items-center gap-2 text-gray-800`, children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: `${isMobile ? "h-4 w-4" : "h-5 w-5"} text-red-500` }),
            "Common Items",
            !isMobile && /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 text-gray-400" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Frequently dropped items with lower values" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            CategoryStatsCard,
            {
              stats: commonStats,
              title: "Common Items",
              type: "common"
            }
          ),
          /* @__PURE__ */ jsx(
            ScrollableContainer,
            {
              maxHeight: topCommonItems.length <= 3 ? "max-h-none" : isMobile ? "max-h-48" : "max-h-60",
              className: "space-y-2",
              showIndicators: topCommonItems.length > 3,
              children: /* @__PURE__ */ jsx("div", { className: "px-2 pt-3", children: topCommonItems && topCommonItems.length > 0 ? topCommonItems.map((item, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex items-center gap-2 p-2 bg-red-50 rounded border border-red-200 mb-2
                                    ${isMobile ? "min-h-[44px] hover:scale-[1.02]" : "hover:scale-[1.03]"}
                                    transition-transform origin-center relative z-10 overflow-visible cursor-pointer`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `${isMobile ? "w-10 h-10" : "w-12 h-12"} bg-red-100 rounded flex items-center justify-center flex-shrink-0 p-1`, children: item.image ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: item.image,
                        alt: item.name,
                        className: "w-full h-full object-contain rounded",
                        loading: "lazy",
                        referrerPolicy: "no-referrer"
                      }
                    ) : /* @__PURE__ */ jsx(AlertTriangle, { className: `${isMobile ? "w-3 h-3" : "w-4 h-4"} text-red-500` }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("div", { className: `font-medium ${isMobile ? "text-xs" : "text-sm"} truncate text-gray-800`, children: item.name }),
                      /* @__PURE__ */ jsxs("div", { className: `${isMobile ? "text-xs" : "text-xs"} text-red-600 font-mono`, children: [
                        "Drop Rate: ",
                        formatDropRate(item.drop_chance)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: `text-red-600 font-semibold ${isMobile ? "text-xs" : "text-sm"}`, children: formatCurrency(item.value) })
                  ]
                },
                i
              )) : /* @__PURE__ */ jsx("div", { className: `text-gray-500 text-center py-4 ${isMobile ? "text-sm" : ""}`, children: "No common items available" }) })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
const ProviderBreadcrumb = ({
  providerId,
  boxName,
  className = ""
}) => {
  providerId ? PROVIDER_CONFIGS[providerId] : null;
  const isMobile = useIsMobile();
  if (isMobile) {
    return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 overflow-x-auto py-3 px-1 ${className}`, children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/hub",
          className: "flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200 shadow-sm flex-shrink-0",
          children: [
            /* @__PURE__ */ jsx(Home, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Hub" })
          ]
        }
      ),
      boxName && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-400 flex-shrink-0" }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 border border-gray-300 rounded-full px-3 py-2 text-sm font-bold text-gray-900 shadow-sm flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px]", children: boxName }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("nav", { className: `flex items-center space-x-2 text-sm ${className}`, children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/hub",
        className: "flex items-center gap-2 hover:text-purple-600 transition-colors text-base font-medium text-gray-600",
        children: [
          /* @__PURE__ */ jsx(Home, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Hub" })
        ]
      }
    ),
    boxName && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-400" }),
      /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 text-lg max-w-[300px] truncate", children: boxName })
    ] })
  ] });
};
const BoxDetailSkeleton = () => /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-6 max-w-7xl", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-32" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-96" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-3/4" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/2" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full" })
    ] })
  ] })
] });
const BoxDetail = () => {
  const { boxSlug } = useParams();
  const navigate = useNavigate();
  useIsMobile();
  const { boxData, loading, error } = useBoxDetail(boxSlug || "");
  const { suggestions, loading: suggestionsLoading, findSuggestions } = useBoxSuggestions();
  useEffect(() => {
    if (!loading && !boxData && !error && boxSlug) {
      findSuggestions(boxSlug);
    }
  }, [loading, boxData, error, boxSlug, findSuggestions]);
  if (loading) {
    return /* @__PURE__ */ jsx(DotBackground, { className: "min-h-screen", children: /* @__PURE__ */ jsx(BoxDetailSkeleton, {}) });
  }
  if (error) {
    return /* @__PURE__ */ jsx(DotBackground, { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-red-600 text-xl", children: [
        "Error loading mystery box: ",
        error
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/hub", { replace: true }), variant: "outline", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Hub"
      ] })
    ] }) });
  }
  if (!boxData) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: "Mystery Box Not Found | Unpacked.gg" }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: "The requested mystery box could not be found. Browse our collection of mystery boxes with detailed drop rate analysis." })
      ] }),
      /* @__PURE__ */ jsx(DotBackground, { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 max-w-2xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "text-red-600 text-xl font-semibold", children: "Mystery box not found" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
            `We couldn't find a box matching "`,
            boxSlug,
            '"'
          ] })
        ] }),
        suggestions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-center text-gray-700", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Did you mean one of these?" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-3 max-w-md mx-auto", children: suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "justify-between text-left h-auto p-4",
              onClick: () => navigate(`/hub/box/${suggestion.slug}`, { replace: true }),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: suggestion.box_name }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: suggestion.provider_name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-purple-600 font-mono", children: [
                  Math.round(suggestion.score * 100),
                  "% match"
                ] })
              ]
            },
            index
          )) })
        ] }),
        suggestionsLoading && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-center text-gray-500", children: [
          /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Finding similar boxes..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/hub", { replace: true }), variant: "outline", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back to Hub"
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/hub", { replace: true }), variant: "default", children: "Browse All Boxes" })
        ] })
      ] }) })
    ] });
  }
  const providerConfig = PROVIDER_CONFIGS[boxData.provider];
  const currentBoxSlug = generateSlug(boxData.box_name);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        boxData.box_name,
        " (",
        boxData.provider === "rillabox" ? "RillaBox" : boxData.provider === "hypedrop" ? "Hypedrop" : boxData.provider === "casesgg" ? "Cases.GG" : boxData.provider === "luxdrop" ? "Luxdrop" : "Mystery Box",
        ") - Mystery Box Analysis | Unpacked.gg"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Detailed analysis of ${boxData.box_name} mystery box from ${providerConfig == null ? void 0 : providerConfig.displayName}. EV: ${boxData.expected_value_percent_of_price.toFixed(1)}%, Floor Rate: ${boxData.floor_rate_percent.toFixed(1)}%, Price: $${boxData.box_price}. View drop rates and item statistics.`
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: `${boxData.box_name}, ${providerConfig == null ? void 0 : providerConfig.displayName}, mystery box, drop rates, expected value, ${boxData.category}, unboxing`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${boxData.box_name} (${providerConfig == null ? void 0 : providerConfig.displayName}) - Mystery Box Analysis | Unpacked.gg` }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: `${boxData.expected_value_percent_of_price.toFixed(1)}% EV • $${boxData.box_price} • ${boxData.floor_rate_percent.toFixed(1)}% Floor Rate • Detailed drop rate analysis` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "product" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: boxData.box_image || "https://unpacked.gg/lovable-uploads/5287436e-c9c8-46af-a4b6-4b553d93c81a.png" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://unpacked.gg/hub/box/${currentBoxSlug}` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: `${boxData.box_name} (${providerConfig == null ? void 0 : providerConfig.displayName}) - Mystery Box Analysis | Unpacked.gg` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: `${boxData.expected_value_percent_of_price.toFixed(1)}% EV • $${boxData.box_price} • Comprehensive drop rate analysis` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: boxData.box_image || "https://unpacked.gg/lovable-uploads/5287436e-c9c8-46af-a4b6-4b553d93c81a.png" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://unpacked.gg/hub/box/${currentBoxSlug}` }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": boxData.box_name,
        "image": boxData.box_image,
        "description": `Mystery box with ${boxData.expected_value_percent_of_price.toFixed(1)}% expected value and ${boxData.floor_rate_percent.toFixed(1)}% floor rate.`,
        "brand": {
          "@type": "Brand",
          "name": providerConfig == null ? void 0 : providerConfig.displayName
        },
        "offers": {
          "@type": "Offer",
          "price": boxData.box_price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "category": boxData.category,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": Math.min(5, boxData.expected_value_percent_of_price / 20),
          "ratingCount": 1
        }
      }) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://unpacked.gg"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Mystery Boxes Hub",
            "item": "https://unpacked.gg/hub"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": providerConfig == null ? void 0 : providerConfig.displayName,
            "item": `https://unpacked.gg/hub/${boxData.provider}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": boxData.box_name
          }
        ]
      }) })
    ] }),
    /* @__PURE__ */ jsx(DotBackground, { className: "min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-6 max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => navigate("/hub", { replace: true }),
            variant: "outline",
            className: "flex items-center gap-2 shrink-0",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back to Hub"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          ProviderBreadcrumb,
          {
            providerId: boxData.provider,
            boxName: boxData.box_name,
            className: "text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(BoxDetailContent, { box: boxData })
    ] }) })
  ] });
};
const ProviderHub = () => {
  var _a2;
  const { provider } = useParams();
  if (!provider || !(provider in PROVIDER_CONFIGS)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/hub", replace: true });
  }
  const config = PROVIDER_CONFIGS[provider];
  const { boxesData, loading } = useUnifiedBoxData([provider]);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(boxesData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredAndSortedBoxes = boxesData.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const topBoxes = boxesData.sort((a, b) => b.expected_value_percent_of_price - a.expected_value_percent_of_price).slice(0, 5);
  const avgEV = boxesData.length > 0 ? boxesData.reduce((sum, box) => sum + box.expected_value_percent_of_price, 0) / boxesData.length : 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        config.displayName,
        " Mystery Boxes - Drop Rates & Expected Value | Unpacked.gg"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Discover the best ${config.displayName} mystery boxes with comprehensive drop rate analysis. View expected values, volatility, and find profitable boxes with detailed statistics.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: `${config.displayName}, mystery boxes, drop rates, expected value, unboxing, case opening` }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${config.displayName} Mystery Boxes | Unpacked.gg` }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: `Find the best ${config.displayName} mystery boxes with detailed analytics and drop rate analysis.` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: `${config.displayName} Mystery Boxes | Unpacked.gg` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: `Comprehensive ${config.displayName} mystery box analytics and drop rate analysis.` }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://unpacked.gg/hub/${provider}` })
    ] }),
    /* @__PURE__ */ jsx(DotBackground, { className: "min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxs("h1", { className: `text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`, children: [
          config.displayName,
          " Mystery Boxes"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: [
          "Comprehensive analysis of ",
          config.displayName,
          " mystery boxes with drop rates, expected values, and volatility metrics."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: `${config.borderColor} border-2`, children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Total Boxes" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold ${config.textColor}`, children: boxesData.length }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: `${config.borderColor} border-2`, children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Average EV" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${config.textColor}`, children: [
            avgEV.toFixed(1),
            "%"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: `${config.borderColor} border-2`, children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-gray-600", children: "Best Box EV" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${config.textColor}`, children: [
            ((_a2 = topBoxes[0]) == null ? void 0 : _a2.expected_value_percent_of_price.toFixed(1)) || "0",
            "%"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: [
          "All ",
          config.displayName,
          " Mystery Boxes"
        ] }),
        loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-96 bg-gray-200 animate-pulse rounded-xl" }, i)) }) : /* @__PURE__ */ jsx(
          VirtualizedBoxGrid,
          {
            boxes: filteredAndSortedBoxes,
            itemsPerPage: 20,
            currentPage
          }
        )
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [...Array(totalPages)].map((_, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(i + 1),
          className: `px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === i + 1 ? `${config.bgColor} ${config.textColor}` : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
          children: i + 1
        },
        i
      )) }) })
    ] }) })
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const LegacyBoxRedirect = () => {
  const { boxSlug } = useParams();
  return /* @__PURE__ */ jsx(Navigate, { to: `/hub/box/${boxSlug}`, replace: true });
};
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Navigate, { to: "/hub", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/hub", element: /* @__PURE__ */ jsx(Hub, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/hub/:provider", element: /* @__PURE__ */ jsx(ProviderHub, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/hub/box/:boxSlug", element: /* @__PURE__ */ jsx(BoxDetail, {}) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/hub/:provider/box/:boxSlug",
        element: /* @__PURE__ */ jsx(LegacyBoxRedirect, {})
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] })
] }) }) });
function render(url, boxData) {
  var _a2;
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(MemoryRouter, { initialEntries: [url], children: /* @__PURE__ */ jsx(App, {}) }) })
  );
  const { helmet } = helmetContext;
  let metaTags = "";
  if (url.includes("/hub/box/") && boxData) {
    const canonicalUrl = `https://unpacked.gg${url}`;
    const imageUrl = boxData.box_image || "https://unpacked.gg/lovable-uploads/5287436e-c9c8-46af-a4b6-4b553d93c81a.png";
    const providerName = boxData.provider === "rillabox" ? "RillaBox" : boxData.provider === "hypedrop" ? "Hypedrop" : boxData.provider === "casesgg" ? "Cases.GG" : boxData.provider === "luxdrop" ? "Luxdrop" : "Mystery Box";
    const title = `${boxData.box_name} (${providerName}) - Mystery Box Analysis | Unpacked.gg`;
    const description = `Analyze ${boxData.box_name} mystery box with ${(_a2 = boxData.expected_value_percent) == null ? void 0 : _a2.toFixed(1)}% expected value. Check drop rates, volatility, and profitability analysis.`;
    metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <link rel="canonical" href="${canonicalUrl}" />`;
  }
  return {
    html,
    metaTags,
    helmet: helmet ? {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString()
    } : null
  };
}
export {
  render
};
