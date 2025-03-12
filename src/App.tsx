import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

type Todo = {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultTodos: Todo[] = [
  {
    id: 1,
    name: 'Todo 1',
    description: 'Description 1',
    isComplete: false,
  },
  {
    id: 2,
    name: 'Todo 2',
    description: 'Description 2',
    isComplete: true,
  },
  {
    id: 3,
    name: 'Todo 3',
    description: 'Description 3',
    isComplete: false,
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);

  function checkTodo(todoId: number) {
    setTodos(todos => {
      return todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      });
    });
  }

  function deleteTodo(todoId: number): void {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ mt: 2 }}>
          <Typography variant='h3'>Todo List App</Typography>
          <Box sx={{ mt: 2 }}>
            {todos.map(todo => (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <Checkbox checked={todo.isComplete} onChange={() => checkTodo(todo.id)} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ textDecoration: todo.isComplete ? 'line-through' : undefined }}>
                          {todo.name}
                        </Typography>
                        <Typography variant="body1">
                          {todo.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => deleteTodo(todo.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
