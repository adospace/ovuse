"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _2 = require("../.");
let NativeElement = NativeElement_1 = class NativeElement extends _1.FrameworkElement {
    constructor(elementType) {
        super();
        this.elementType = elementType;
        this._child = null;
        this._measuredSize = null;
    }
    get child() {
        return this._child;
    }
    set child(value) {
        if (this._child != value) {
            if (this._child != null && this._child.parent == this) {
                this._child.parent = null;
                this._child.attachVisual(null);
            }
            this._child = value;
            if (this._child != null) {
                this._child.parent = this;
                if (this._visual != null)
                    this._child.attachVisual(this._visual, true);
            }
            this.invalidateMeasure();
        }
    }
    invalidateMeasure() {
        this._measuredSize = null;
        super.invalidateMeasure();
    }
    attachVisualOverride(elementContainer) {
        this._visual = document.createElement(this.elementType);
        var text = this.text;
        if (text != null)
            this._visual.innerHTML = text;
        if (this._child != null) {
            var childVisual = this._child.attachVisual(this._visual, true);
            if (childVisual != null && !this.arrangeChild)
                childVisual.style.position = "";
        }
        super.attachVisualOverride(elementContainer);
    }
    onDependencyPropertyChanged(property, value, oldValue) {
        if (property == NativeElement_1.textProperty && this._visual != null) {
            this._visual.innerHTML = value;
        }
        super.onDependencyPropertyChanged(property, value, oldValue);
    }
    measureOverride(constraint) {
        if (this.arrangeChild) {
            if (this._child != null)
                this._child.measure(constraint);
        }
        var pElement = this._visual;
        ;
        if (this._measuredSize == null && pElement != null) {
            pElement.style.width = "";
            pElement.style.height = "";
            this._measuredSize = new _1.Size(pElement.clientWidth, pElement.clientHeight);
        }
        if (this._measuredSize != null)
            return new _1.Size(Math.min(constraint.width, this._measuredSize.width), Math.min(constraint.height, this._measuredSize.height));
        return constraint;
    }
    arrangeOverride(finalSize) {
        var pElement = this._visual;
        if (pElement != null) {
            pElement.style.width = finalSize.width.toString() + "px";
            pElement.style.height = finalSize.height.toString() + "px";
        }
        if (this.arrangeChild) {
            var child = this.child;
            if (child != null) {
                child.arrange(new _1.Rect(0, 0, finalSize.width, finalSize.height));
            }
        }
        return finalSize;
    }
    get text() {
        return this.getValue(NativeElement_1.textProperty);
    }
    set text(value) {
        this.setValue(NativeElement_1.textProperty, value);
    }
    get arrangeChild() {
        return this.getValue(NativeElement_1.arrangeChildProperty);
    }
    set arrangeChild(value) {
        this.setValue(NativeElement_1.arrangeChildProperty, value);
    }
};
NativeElement.textProperty = _2.DependencyObject.registerProperty(NativeElement_1, "Text", null, _1.FrameworkPropertyMetadataOptions.AffectsMeasure | _1.FrameworkPropertyMetadataOptions.AffectsRender, (v) => String(v));
NativeElement.arrangeChildProperty = _2.DependencyObject.registerProperty(NativeElement_1, "ArrangeChild", true, _1.FrameworkPropertyMetadataOptions.None, (v) => v != null && v.trim().toLowerCase() == "true");
NativeElement = NativeElement_1 = __decorate([
    _2.TypeId("ovuse.controls.NativeElement"),
    __metadata("design:paramtypes", [String])
], NativeElement);
exports.NativeElement = NativeElement;
let div = class div extends NativeElement {
    constructor() {
        super("div");
    }
};
div = __decorate([
    _2.TypeId("ovuse.controls.div"),
    __metadata("design:paramtypes", [])
], div);
exports.div = div;
let a = class a extends NativeElement {
    constructor() {
        super("a");
    }
};
a = __decorate([
    _2.TypeId("ovuse.controls.a"),
    __metadata("design:paramtypes", [])
], a);
exports.a = a;
let img = class img extends NativeElement {
    constructor() {
        super("img");
    }
};
img = __decorate([
    _2.TypeId("ovuse.controls.img"),
    __metadata("design:paramtypes", [])
], img);
exports.img = img;
let i = class i extends NativeElement {
    constructor() {
        super("i");
    }
};
i = __decorate([
    _2.TypeId("ovuse.controls.i"),
    __metadata("design:paramtypes", [])
], i);
exports.i = i;
let ul = class ul extends NativeElement {
    constructor() {
        super("ul");
    }
};
ul = __decorate([
    _2.TypeId("ovuse.controls.ul"),
    __metadata("design:paramtypes", [])
], ul);
exports.ul = ul;
let li = class li extends NativeElement {
    constructor() {
        super("li");
    }
};
li = __decorate([
    _2.TypeId("ovuse.controls.li"),
    __metadata("design:paramtypes", [])
], li);
exports.li = li;
let nav = class nav extends NativeElement {
    constructor() {
        super("nav");
    }
};
nav = __decorate([
    _2.TypeId("ovuse.controls.nav"),
    __metadata("design:paramtypes", [])
], nav);
exports.nav = nav;
let span = class span extends NativeElement {
    constructor() {
        super("span");
    }
};
span = __decorate([
    _2.TypeId("ovuse.controls.span"),
    __metadata("design:paramtypes", [])
], span);
exports.span = span;
let h1 = h1_1 = class h1 extends NativeElement {
    constructor() {
        super("h1");
    }
    get typeName() {
        return h1_1.typeName;
    }
};
h1.typeName = "layouts.controls.h1";
h1 = h1_1 = __decorate([
    _2.TypeId("ovuse.controls.h1"),
    __metadata("design:paramtypes", [])
], h1);
exports.h1 = h1;
let h2 = h2_1 = class h2 extends NativeElement {
    constructor() {
        super("h2");
    }
    get typeName() {
        return h2_1.typeName;
    }
};
h2.typeName = "layouts.controls.h2";
h2 = h2_1 = __decorate([
    _2.TypeId("ovuse.controls.h2"),
    __metadata("design:paramtypes", [])
], h2);
exports.h2 = h2;
let h3 = h3_1 = class h3 extends NativeElement {
    constructor() {
        super("h3");
    }
    get typeName() {
        return h3_1.typeName;
    }
};
h3.typeName = "layouts.controls.h3";
h3 = h3_1 = __decorate([
    _2.TypeId("ovuse.controls.h3"),
    __metadata("design:paramtypes", [])
], h3);
exports.h3 = h3;
let h4 = h4_1 = class h4 extends NativeElement {
    constructor() {
        super("h4");
    }
    get typeName() {
        return h4_1.typeName;
    }
};
h4.typeName = "layouts.controls.h4";
h4 = h4_1 = __decorate([
    _2.TypeId("ovuse.controls.h4"),
    __metadata("design:paramtypes", [])
], h4);
exports.h4 = h4;
let h5 = h5_1 = class h5 extends NativeElement {
    constructor() {
        super("h5");
    }
    get typeName() {
        return h5_1.typeName;
    }
};
h5.typeName = "layouts.controls.h5";
h5 = h5_1 = __decorate([
    _2.TypeId("ovuse.controls.h5"),
    __metadata("design:paramtypes", [])
], h5);
exports.h5 = h5;
var NativeElement_1, h1_1, h2_1, h3_1, h4_1, h5_1;
