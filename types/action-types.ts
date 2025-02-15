export type ActionResult<T = void> = {
  isSuccess: boolean;
  message: string;
  data?: T;
}; 