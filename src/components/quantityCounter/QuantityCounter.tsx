import { ChangeEvent, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 0,
    },
    '& input': {
      textAlign: 'center',
      width: 20,
      height: 15,
    },
  },
});

interface QuantityCounterProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityCounter = ({ quantity, onQuantityChange }: QuantityCounterProps) => {
  const [count, setCount] = useState(quantity || 1);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.max(Number(event.target.value), 1);
    setCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          setCount((prev) => prev - 1);
          onQuantityChange(count - 1);
        }}
        disabled={count === 1}
        size='small'
      >
        <RemoveIcon fontSize='small' />
      </Button>
      <StyledInput size='small' onChange={handleChange} value={count} />
      <Button
        onClick={() => {
          setCount((prev) => prev + 1);
          onQuantityChange(count + 1);
        }}
        size='small'
      >
        <AddIcon fontSize='small' />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityCounter;
