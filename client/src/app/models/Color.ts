export class Color {
  public color: string;
  public code: {
    hex: string;
  };
  public id?: number;

  constructor() {
    this.color = '';
    this.code = { hex: '' };
  }
}
