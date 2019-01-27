import { Observable, Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

import { Type } from '../common/interfaces'

export interface EventObservable<T> {
  ofType(...events: Array<Type<any>>): Observable<T>
}

const isEmpty = (array: Array<Type<any>>) => !(array && array.length > 0)

export class Bus<T> extends Observable<T> implements EventObservable<T> {
  protected subject = new Subject<T>()

  public constructor() {
    super()
    this.source = this.subject
  }

  public ofType(...types: Array<Type<any>>): Observable<T> {
    return this.pipe(filter(event => !isEmpty(types.filter(type => event instanceof type))))
  }
}
