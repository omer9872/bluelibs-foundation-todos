export class Todo {

  private id?: number;
  private title?: string;
  private isDone?: boolean;
  private createDate?: number;

  constructor(id?: number, title?: string, isDone?: boolean, createDate?: number) {
    this.id = id || 0;
    this.title = title || "";
    this.isDone = isDone || false;
    this.createDate = createDate || Date.now();
  }

  public fromJSON(requestBody: any): Todo {
    this.id = requestBody.id ?? "";
    this.title = requestBody.title ?? "";
    this.isDone = requestBody.isDone ?? "";
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

  public getIsDone(): boolean {
    return this.isDone!;
  }
  public setIsDone(newIsDone: boolean): void {
    this.isDone = newIsDone;
  }

  public getCreateDate(): number {
    return this.createDate!;
  }
  public setCreateDate(newCreateDate: number): void {
    this.createDate = newCreateDate;
  }

}