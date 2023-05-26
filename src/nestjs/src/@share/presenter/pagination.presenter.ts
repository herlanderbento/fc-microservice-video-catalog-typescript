import { Transform } from 'class-transformer';

export type PaginationPresenterProps = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

export class PaginationPresenter {
  @Transform(({ value }) => parseInt(value))
  public current_page: number;
  @Transform(({ value }) => parseInt(value))
  public per_page: number;
  @Transform(({ value }) => parseInt(value))
  public last_page: number;
  @Transform(({ value }) => parseInt(value))
  public total: number;

  constructor(props: PaginationPresenterProps) {
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = props.last_page;
    this.total = props.total;
  }
}
