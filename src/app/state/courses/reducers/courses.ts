import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseData } from '../../../models/course';
import {
  LOAD_COURSE_SUCCESS, LOAD_COURSES_SUCCESS, CoursesAction,

} from '../actions/courses';

export interface State extends EntityState<CourseData> {}

export const adapter: EntityAdapter<CourseData> = createEntityAdapter();

const initialState: State = adapter.getInitialState({});

export function reducer(state: State = initialState, action: CoursesAction) {
  switch (action.type) {
    case LOAD_COURSE_SUCCESS:
      return adapter.addOne(action.payload, state);
    case LOAD_COURSES_SUCCESS:
      return adapter.addMany(action.payload, state);
    default:
      return state;
  }
}
