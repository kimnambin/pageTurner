import React from 'react';
import styled from 'styled-components';
import {BookReviewItemWrite} from '../../models/book.model';
import {useForm} from 'react-hook-form';
import Button from '../common/Button';

interface Props {
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReviewAdd = ({onAdd}: Props) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<BookReviewItemWrite>();

  const optionNumber = Array.from({length: 5}, (_, idx) => {
    return idx;
  });

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea
            {...register('content', {required: true})}
            key={onAdd.name}
            value={onAdd.name}>
            리뷰 내용...
          </textarea>
          {errors.content && (
            <p className="error-text">리뷰 내용을 입력해 주세요.</p>
          )}
        </fieldset>
        <div className="submit">
          <fieldset>
            <select
              {...register('score', {required: true, valueAsNumber: true})}>
              {optionNumber.map(number => (
                <option value={number + 1} key={number + 1}>
                  {number + 1}점
                </option>
              ))}
            </select>
            <Button size="medium" scheme="primary">
              작성하기
            </Button>
          </fieldset>
        </div>
      </form>
    </BookReviewAddStyle>
  );
};

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;

      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: end;

      .error-text {
        color: red;
        padding: 0;
        margin: 0;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      border-radius: ${({theme}) => theme.borderRadius.default};
      border: 1px solid ${({theme}) => theme.color.border};
      padding: 12px;
    }
  }

  .submit {
    display: flex;
    justify-content: end;
    gap: 10px;

    fieldset {
      display: flex;
      flex-direction: row;
      justify-content: end;
      gap: 10px;
    }
  }
`;

export default BookReviewAdd;
