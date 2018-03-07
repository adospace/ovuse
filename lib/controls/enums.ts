export enum FrameworkPropertyMetadataOptions {
    /// No flags
    None = 0x000,

    /// This property affects measurement
    AffectsMeasure = 0x001,

    /// This property affects arragement
    AffectsArrange = 0x002,

    /// This property affects parent's measurement
    AffectsParentMeasure = 0x004,

    /// This property affects parent's arrangement
    AffectsParentArrange = 0x008,

    /// This property affects rendering
    AffectsRender = 0x010,

    /// This property inherits to children
    Inherits = 0x020,

    /// NOT SUPPORTED: 
    /// This property causes inheritance and resource lookup to override values 
    /// of InheritanceBehavior that may be set on any FE in the path of lookup
    OverridesInheritanceBehavior = 0x040,

    /// This property does not support data binding
    NotDataBindable = 0x080,

    /// Data bindings on this property default to two-way
    BindsTwoWayByDefault = 0x100,
}

export enum HorizontalAlignment { Left, Center, Right, Stretch }

export enum VerticalAlignment { Top, Center, Bottom, Stretch }

export enum SizeToContent {
    None = 0,
    Both = 1,
    Vertical = 2,
    Horizontal = 3
}

export enum PopupPosition {
    Center,
    Left,
    LeftTop,
    LeftBottom,
    Top,
    TopLeft,
    TopRight,
    Right,
    RightTop,
    RightBottom,
    Bottom,     
    BottomLeft,       
    BottomRight,       
}