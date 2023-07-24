import {Color, PathDrawingOptions, StepFunction, SvgInlineStyle, TextOptions} from "progressbar.js";

export class DrawingOptions implements PathDrawingOptions {
  attachement: SVGPathElement | undefined;
  color: string | undefined;
  duration: number | undefined;
  easing: string | undefined;
  fill: string | null | undefined;
  from: Color | undefined;
  step: StepFunction | undefined;
  strokeWidth: number | undefined;
  svgStyle: SvgInlineStyle | null | undefined;
  text: TextOptions | null | undefined;
  to: Color | undefined;
  trailColor: string | undefined;
  trailWidth: number | undefined;
  warnings: boolean | undefined;
}
