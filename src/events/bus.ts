import { Observable } from 'rxjs'

export class Bus<T> extends Observable<T> {
  public constructor() {
    super()
  }
}
