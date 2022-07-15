this.smartmed = this.smartmed || {};
this.smartmed.VirtualList = (function (vue) {
  'use strict';

  var Direction$1;
  (function (Direction) {
      Direction["FRONT"] = "FRONT";
      Direction["BEHIND"] = "BEHIND";
  })(Direction$1 || (Direction$1 = {}));
  var CalcType;
  (function (CalcType) {
      CalcType["INIT"] = "INIT";
      CalcType["FIXED"] = "FIXED";
      CalcType["DYNAMIC"] = "DYNAMIC";
  })(CalcType || (CalcType = {}));
  const LEADING_BUFFER = 5;
  const Virtual = (param, callUpdate) => {
      const _virtualInstance = {
          range: {},
          sizes: new Map(),
          firstRangeTotalSize: 0,
          firstRangeAverageSize: 0,
          lastCalcIndex: 0,
          fixedSizeValue: 0,
          calcType: CalcType.INIT,
          direction: null,
          param: param,
          callUpdate: callUpdate,
          offset: 0,
          destroy() {
              this.range = {};
              this.sizes = new Map();
              this.firstRangeTotalSize = 0;
              this.firstRangeAverageSize = 0;
              this.lastCalcIndex = 0;
              this.fixedSizeValue = 0;
              this.calcType = CalcType.INIT;
              this.offset = 0;
              this.direction = null;
          },
          getRange() {
              const { start, end, padFront, padBehind } = this.range;
              return {
                  start,
                  end,
                  padFront,
                  padBehind,
              };
          },
          isBehind() {
              return this.direction === Direction$1.BEHIND;
          },
          isFront() {
              return this.direction === Direction$1.FRONT;
          },
          getOffset(start) {
              return ((start < 1 ? 0 : this.getIndexOffset(start)) + this.param.slotHeaderSize);
          },
          updateParam(key, value) {
              if (this.param && key in this.param) {
                  if (key === "uniqueIds") {
                      this.sizes.forEach((v, key) => {
                          const isNotIncludes = !value.includes(key);
                          if (isNotIncludes) {
                              this.sizes.delete(key);
                          }
                      });
                  }
                  this.param[key] = value;
              }
          },
          saveSize(id, size) {
              this.sizes.set(id, size);
              if (this.calcType === CalcType.INIT) {
                  this.fixedSizeValue = size;
                  this.calcType = CalcType.FIXED;
              }
              else if (this.calcType === CalcType.FIXED &&
                  this.fixedSizeValue !== size) {
                  this.calcType = CalcType.DYNAMIC;
                  this.fixedSizeValue = null;
              }
              if (this.calcType !== CalcType.FIXED &&
                  typeof this.firstRangeTotalSize !== "undefined") {
                  if (this.sizes.size <
                      Math.min(this.param.keeps, this.param.uniqueIds.length)) {
                      this.firstRangeTotalSize = [...this.sizes.values()].reduce((acc, val) => acc + val, 0);
                      this.firstRangeAverageSize = Math.round(this.firstRangeTotalSize / this.sizes.size);
                  }
                  else {
                      this.firstRangeTotalSize = null;
                  }
              }
          },
          handleItemsChange() {
              let start = this.range.start;
              if (this.isFront()) {
                  start = start - LEADING_BUFFER;
              }
              else if (this.isBehind()) {
                  start = start + LEADING_BUFFER;
              }
              start = Math.max(start, 0);
              this.updateRange(this.range.start, this.getEndByStart(start));
          },
          handleSlotSizeChange() {
              this.handleItemsChange();
          },
          handleScroll(offset) {
              this.direction =
                  offset < this.offset ? Direction$1.FRONT : Direction$1.BEHIND;
              this.offset = offset;
              if (!this.param) {
                  return;
              }
              if (this.direction === Direction$1.FRONT) {
                  this.handleFront();
              }
              else if (this.direction === Direction$1.BEHIND) {
                  this.handleBehind();
              }
          },
          handleFront() {
              const overs = this.getScrollOvers();
              if (this.range.start && overs > this.range.start) {
                  return;
              }
              const start = Math.max(overs - this.param.buffer, 0);
              this.checkRange(start, this.getEndByStart(start));
          },
          handleBehind() {
              const overs = this.getScrollOvers();
              if (this.range.start && overs < this.range.start + this.param.buffer) {
                  return;
              }
              this.checkRange(overs, this.getEndByStart(overs));
          },
          getScrollOvers() {
              const offset = this.offset - this.param.slotHeaderSize;
              if (offset <= 0) {
                  return 0;
              }
              if (this.isFixedType()) {
                  return Math.floor(offset / this.fixedSizeValue);
              }
              let low = 0;
              let middle = 0;
              let middleOffset = 0;
              let high = this.param.uniqueIds.length;
              while (low <= high) {
                  middle = low + Math.floor((high - low) / 2);
                  middleOffset = this.getIndexOffset(middle);
                  if (middleOffset === offset) {
                      return middle;
                  }
                  else if (middleOffset < offset) {
                      low = middle + 1;
                  }
                  else if (middleOffset > offset) {
                      high = middle - 1;
                  }
              }
              return low > 0 ? --low : 0;
          },
          getIndexOffset(givenIndex) {
              if (!givenIndex) {
                  return 0;
              }
              let offset = 0;
              let indexSize = undefined;
              for (let index = 0; index < givenIndex; index++) {
                  indexSize = this.sizes.get(this.param.uniqueIds[index]);
                  offset =
                      offset +
                          (typeof indexSize === "number" ? indexSize : this.getEstimateSize());
              }
              this.lastCalcIndex = Math.max(this.lastCalcIndex, givenIndex - 1);
              this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex());
              return offset;
          },
          isFixedType() {
              return this.calcType === CalcType.FIXED;
          },
          getLastIndex() {
              return this.param.uniqueIds.length - 1;
          },
          checkRange(start, end) {
              const keeps = this.param.keeps;
              const total = this.param.uniqueIds.length;
              if (total <= keeps) {
                  start = 0;
                  end = this.getLastIndex();
              }
              else if (end - start < keeps - 1) {
                  start = end - keeps + 1;
              }
              if (this.range.start !== start) {
                  this.updateRange(start, end);
              }
          },
          updateRange(start, end) {
              this.range.start = start;
              this.range.end = end;
              this.range.padFront = this.getPadFront();
              this.range.padBehind = this.getPadBehind();
              this.callUpdate(this.getRange());
          },
          getEndByStart(start) {
              const theoryEnd = start + this.param.keeps - 1;
              const truelyEnd = Math.min(theoryEnd, this.getLastIndex());
              return truelyEnd;
          },
          getPadFront() {
              if (this.isFixedType()) {
                  return this.fixedSizeValue * this.range.start;
              }
              else {
                  return this.getIndexOffset(this.range.start);
              }
          },
          getPadBehind() {
              const end = this.range.end;
              const lastIndex = this.getLastIndex();
              if (this.isFixedType()) {
                  return (lastIndex - end) * this.fixedSizeValue;
              }
              if (this.lastCalcIndex === lastIndex) {
                  return this.getIndexOffset(lastIndex) - this.getIndexOffset(end);
              }
              else {
                  return (lastIndex - end) * this.getEstimateSize();
              }
          },
          getEstimateSize() {
              return this.isFixedType()
                  ? this.fixedSizeValue
                  : this.firstRangeAverageSize || this.param.estimateSize;
          },
      };
      if (param) {
          _virtualInstance.checkRange(0, param.keeps - 1);
      }
      return _virtualInstance;
  };

  var script$1 = vue.defineComponent({
      name: "VirtualListItem",
      props: {
          horizontal: {
              type: Boolean,
          },
      },
      setup(props, ctx) {
          const { horizontal } = vue.toRefs(props);
          const root = vue.ref(null);
          let resizeObserver = null;
          const shapeKey = vue.computed(() => horizontal.value ? "offsetWidth" : "offsetHeight");
          vue.onMounted(() => {
              if (typeof ResizeObserver !== "undefined" && root.value) {
                  resizeObserver = new ResizeObserver(() => {
                      dispatchSizeChange();
                  });
                  resizeObserver.observe(root.value);
              }
          });
          const dispatchSizeChange = () => {
              ctx.emit("item-resize", getCurrentSize());
          };
          const getCurrentSize = () => {
              return root.value ? root.value[shapeKey.value] : 0;
          };
          vue.onUpdated(() => {
              dispatchSizeChange();
          });
          vue.onBeforeUnmount(() => {
              if (resizeObserver) {
                  resizeObserver.disconnect();
                  resizeObserver = null;
              }
          });
          return {
              root,
          };
      },
  });

  const _hoisted_1 = {
    ref: "root",
    role: "listitem"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 512))
  }

  script$1.render = render$1;

  var Direction;
  (function (Direction) {
      Direction["HORIZONTAL"] = "horizontal";
      Direction["VERTICAL"] = "vertical";
  })(Direction || (Direction = {}));
  var script = vue.defineComponent({
      components: {
          Item: script$1,
      },
      name: "VirtualList",
      props: {
          items: {
              type: Array,
              required: true,
          },
          dataKey: {
              type: String,
              required: true,
              default: "id",
          },
          keeps: {
              type: Number,
              default: 50,
          },
          estimateSize: {
              type: Number,
              default: 50,
          },
          pageMode: {
              type: Boolean,
          },
          direction: {
              type: String,
              validator: (value) => Object.values(Direction).includes(value),
              default: Direction.VERTICAL,
          },
          start: {
              type: Number,
              default: 0,
          },
          offset: {
              type: Number,
              default: 0,
          },
          topThreshold: {
              type: Number,
              default: 0,
          },
          bottomThreshold: {
              type: Number,
              default: 0,
          },
      },
      setup(props, ctx) {
          const { dataKey, items, direction, start, offset, topThreshold, bottomThreshold, keeps, pageMode, } = vue.toRefs(props);
          const range = vue.ref({});
          const root = vue.ref(null);
          const shepherd = vue.ref(null);
          const onRangeChanged = (value) => {
              range.value = value;
          };
          const getUniqueIdFromItems = vue.computed(() => {
              return items.value.map((item) => item[dataKey.value]);
          });
          const isHorizontal = vue.computed(() => direction.value === Direction.HORIZONTAL);
          const directionKey = vue.computed(() => isHorizontal.value ? "scrollLeft" : "scrollTop");
          const virtual = Virtual({
              slotHeaderSize: 0,
              slotFooterSize: 0,
              keeps: props.keeps,
              estimateSize: props.estimateSize,
              buffer: Math.round(props.keeps / 3),
              uniqueIds: getUniqueIdFromItems.value,
          }, onRangeChanged);
          vue.onBeforeMount(() => {
              scrollToOffset(virtual.offset);
          });
          vue.onMounted(() => {
              if (start.value) {
                  scrollToIndex(start.value);
              }
              else if (offset.value) {
                  scrollToOffset(offset.value);
              }
              if (pageMode.value) {
                  updatePageModeFront();
                  document.addEventListener("scroll", onScroll, {
                      passive: false,
                  });
              }
          });
          const scrollToIndex = (index) => {
              if (index >= items.value.length - 1) {
                  scrollToBottom();
              }
              else {
                  const offset = virtual.getOffset(index);
                  scrollToOffset(offset);
              }
          };
          const scrollToBottom = () => {
              if (shepherd.value) {
                  const offset = shepherd.value[isHorizontal.value ? "offsetLeft" : "offsetTop"];
                  scrollToOffset(offset);
                  setTimeout(() => {
                      if (getOffset() + getClientSize() < getScrollSize()) {
                          scrollToBottom();
                      }
                  });
              }
          };
          const getOffset = () => {
              if (pageMode.value) {
                  return (document.documentElement[directionKey.value] ||
                      document.body[directionKey.value]);
              }
              return root.value ? Math.ceil(root.value[directionKey.value]) : 0;
          };
          const getClientSize = () => {
              const key = isHorizontal.value ? "clientWidth" : "clientHeight";
              if (pageMode.value) {
                  return document.documentElement[key] || document.body[key];
              }
              return root.value ? Math.ceil(root.value[key]) : 0;
          };
          const getScrollSize = () => {
              const key = isHorizontal.value ? "scrollWidth" : "scrollHeight";
              if (pageMode.value) {
                  return document.documentElement[key] || document.body[key];
              }
              return root.value ? Math.ceil(root.value[key]) : 0;
          };
          const scrollToOffset = (offset) => {
              if (pageMode.value) {
                  document.body[directionKey.value] = offset;
                  document.documentElement[directionKey.value] = offset;
                  return;
              }
              if (root.value) {
                  root.value[directionKey.value] = offset;
              }
          };
          const updatePageModeFront = () => {
              if (!root.value) {
                  return;
              }
              const rect = root.value.getBoundingClientRect();
              const { defaultView } = root.value.ownerDocument;
              if (defaultView) {
                  const offsetFront = isHorizontal.value
                      ? rect.left + defaultView.pageXOffset
                      : rect.top + defaultView.pageYOffset;
                  virtual.updateParam("slotHeaderSize", offsetFront);
              }
          };
          const emitEvent = (offset, clientSize, scrollSize) => {
              if (virtual.isFront() &&
                  !!items.value.length &&
                  offset - topThreshold.value <= 0) {
                  ctx.emit("totop");
              }
              else if (virtual.isBehind() &&
                  offset + clientSize + bottomThreshold.value >= scrollSize) {
                  ctx.emit("tobottom");
              }
          };
          const onScroll = () => {
              const offset = getOffset();
              const clientSize = getClientSize();
              const scrollSize = getScrollSize();
              if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
                  return;
              }
              virtual.handleScroll(offset);
              emitEvent(offset, clientSize, scrollSize);
          };
          vue.onBeforeUnmount(() => {
              virtual.destroy();
              if (pageMode.value) {
                  document.removeEventListener("scroll", onScroll);
              }
          });
          const groupStyle = vue.computed(() => {
              const { padBehind, padFront } = range.value;
              const padding = isHorizontal.value
                  ? `0px ${padBehind}px 0px ${padFront}px`
                  : `${padFront}px 0px ${padBehind}px`;
              return {
                  padding,
              };
          });
          const computedItems = vue.computed(() => {
              const { start, end } = range.value;
              if (start === undefined || end === undefined) {
                  return items.value;
              }
              return items.value.slice(start, end + 1);
          });
          const onItemResized = (id, size) => {
              virtual.saveSize(id, size);
          };
          const onSlotResized = (key, size) => {
              virtual.updateParam(key, size);
          };
          vue.watch(keeps, (value) => {
              virtual.updateParam("keeps", value);
              virtual.handleSlotSizeChange();
          });
          vue.watch(start, (value) => {
              scrollToIndex(value);
          });
          vue.watch(offset, (value) => {
              scrollToOffset(value);
          });
          vue.watch(items, () => {
              virtual.updateParam("uniqueIds", getUniqueIdFromItems.value);
              virtual.handleItemsChange();
          });
          return {
              root,
              shepherd,
              onScroll,
              groupStyle,
              isHorizontal,
              range,
              computedItems,
              onItemResized,
              onSlotResized,
              scrollToBottom,
          };
      },
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_item = vue.resolveComponent("item");

    return (vue.openBlock(), vue.createElementBlock("div", {
      ref: "root",
      class: vue.normalizeClass([
        !_ctx.pageMode && _ctx.$style.rootScrollable,
        !_ctx.pageMode && _ctx.$style['rootScrollable_' + _ctx.direction],
        _ctx.$style.root,
        _ctx.$style['root_' + _ctx.direction],
      ]),
      onScroll: _cache[2] || (_cache[2] = $event => (!_ctx.pageMode && _ctx.onScroll($event)))
    }, [
      vue.createVNode(_component_item, {
        onItemResize: _cache[0] || (_cache[0] = $event => (_ctx.onSlotResized('slotHeaderSize', $event)))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "before")
        ]),
        _: 3
      }),
      vue.createElementVNode("div", {
        role: "group",
        class: vue.normalizeClass([_ctx.$style.group, _ctx.$style['group_' + _ctx.direction]]),
        style: vue.normalizeStyle(_ctx.groupStyle)
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.computedItems, (element) => {
          return (vue.openBlock(), vue.createBlock(_component_item, {
            key: element[_ctx.dataKey],
            onItemResize: $event => (_ctx.onItemResized(element.id, $event))
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { item: element })
            ]),
            _: 2
          }, 1032, ["onItemResize"]))
        }), 128))
      ], 6),
      vue.createVNode(_component_item, {
        onItemResize: _cache[1] || (_cache[1] = $event => (_ctx.onSlotResized('slotFooterSize', $event)))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "after")
        ]),
        _: 3
      }),
      vue.createElementVNode("div", {
        ref: "shepherd",
        style: vue.normalizeStyle({
          width: _ctx.isHorizontal ? '0px' : '100%',
          height: _ctx.isHorizontal ? '100%' : '0px',
        })
      }, null, 4)
    ], 34))
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "._rootScrollable_horizontal_1kox7_1 {\n  overflow-x: auto;\n}\n._rootScrollable_vertical_1kox7_4 {\n  overflow-y: auto;\n}\n._root_1kox7_1,\n._group_1kox7_9 {\n  display: flex;\n}\n._root_horizontal_1kox7_12,\n._group_horizontal_1kox7_13 {\n  flex-direction: row;\n}\n._root_vertical_1kox7_16,\n._group_vertical_1kox7_17 {\n  flex-direction: column;\n}";
  styleInject(css_248z);

  var style0 = {"rootScrollable_horizontal":"_rootScrollable_horizontal_1kox7_1","rootScrollable_vertical":"_rootScrollable_vertical_1kox7_4","root":"_root_1kox7_1","group":"_group_1kox7_9","root_horizontal":"_root_horizontal_1kox7_12","group_horizontal":"_group_horizontal_1kox7_13","root_vertical":"_root_vertical_1kox7_16","group_vertical":"_group_vertical_1kox7_17"};

  const cssModules = script.__cssModules = {};
  cssModules["$style"] = style0;

  script.render = render;

  return script;

})(Vue);
