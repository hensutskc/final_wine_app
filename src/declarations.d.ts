/* This is where I can declare what a png is so my code in home will understand what I am asking for*/

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}