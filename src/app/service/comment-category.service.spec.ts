import { TestBed } from '@angular/core/testing';

import { CommentCategoryService } from './comment-category.service';

describe('CommentCategoryService', () => {
  let service: CommentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
