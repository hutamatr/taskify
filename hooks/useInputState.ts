import { useState } from 'react';

interface IUseInputStateProps<T> {
  inputState: T;
}

const useInputState = <T>(inputState: IUseInputStateProps<T>) => {
  const [input, setInput] = useState(inputState.inputState);

  const onChangeInputHandler = (identifier: string, text: string | Date) => {
    setInput((prevState) => ({ ...prevState, [identifier]: text }));
  };

  return {
    input,
    setInput,
    onChangeInputHandler,
  };
};

export default useInputState;
