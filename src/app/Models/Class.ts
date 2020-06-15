import { StudentRecord } from './Student';

export interface ClassRecord {
  id: number;

  name: string;

  students: StudentRecord[];
}
