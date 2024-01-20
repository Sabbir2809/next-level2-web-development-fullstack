import TodoContainer from "@/components/todo/TodoContainer";
import Container from "@/components/ui/Container";

export default function Todo() {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold my-10">Todo page</h1>
      <TodoContainer />
    </Container>
  );
}
