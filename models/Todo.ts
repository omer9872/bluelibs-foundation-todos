export class Todo {

  private id?: number;
  private title?: string;
  private status?: string;
  private createDate?: number;

  constructor(id?: number, title?: string, status?: string, createDate?: number) {
    this.id = id || 0;
    this.title = title || "";
    this.status = status || "pending";
    this.createDate = createDate || Date.now();
  }

  public fromJSON(requestBody: any): Todo {
    this.id = requestBody.id ?? "";
    this.title = requestBody.title ?? "";
    this.status = requestBody.status ?? "";
    this.createDate = requestBody.createDate ?? "";
    return this;
  }

  public getID(): number {
    return this.id!;
  }
  public setID(newID: number): void {
    this.id = newID;
  }

  public getTitle(): string {
    return this.title!;
  }
  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }

  public getStatus(): string {
    return this.status!;
  }
  public setStatus(newStatus: string): void {
    this.status = newStatus;
  }

  public getCreateDate(): number {
    return this.createDate!;
  }
  public setCreateDate(newCreateDate: number): void {
    this.createDate = newCreateDate;
  }

}