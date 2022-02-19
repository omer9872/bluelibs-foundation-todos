import { ObjectID } from "@bluelibs/mongo-bundle";

export class Todo {

  private _id?: ObjectID;
  private title?: string;
  private status?: string;
  private createDate?: number;

  constructor(_id?: ObjectID, title?: string, status?: string, createDate?: number) {
    this._id = _id || new ObjectID();
    this.title = title || "";
    this.status = status || "pending";
    this.createDate = createDate || Date.now();
  }

  public fromJSON(requestBody: any): Todo {
    this._id = requestBody._id ?? new ObjectID();
    this.title = requestBody.title ?? "";
    this.status = requestBody.status ?? "pending";
    this.createDate = requestBody.createDate ?? Date.now();
    return this;
  }

  public asJSON(): any {
    return {
      _id: this._id,
      title: this.title,
      status: this.status,
      createDate: this.createDate,
    }
  }

  public getID(): ObjectID {
    return this._id!;
  }
  public setID(newID: ObjectID): void {
    this._id = newID;
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