import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from '../../../models/course';
import {
  LOAD_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  CoursesAction,
  FILTER_COURSES,
  SELECT_COURSE,
} from '../actions/courses';

export interface State extends EntityState<Course> {
  specialization: string | null;
  selectedId: string | null;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  specialization: null,
  selectedId: null,
});

export function reducer(state: State = initialState, action: CoursesAction) {
  switch (action.type) {
    case LOAD_COURSE_SUCCESS:
      return adapter.addOne(action.payload, state);
    case LOAD_COURSES_SUCCESS:
      return adapter.addMany(action.payload, state);
    case SELECT_COURSE:
      return {
        ...state,
        selectedId: action.payload,
      };
    case FILTER_COURSES:
      return {
        ...state,
        specialization: action.payload,
      };
    default:
      return state;
  }
}

export const getSpecialization = (state: State) => state.specialization;
export const getSelectedCourseId = (state: State) => state.selectedId;
