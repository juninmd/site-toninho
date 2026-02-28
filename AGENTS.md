```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines outline the specific requirements for all AI coding agent development within this repository.  Strict adherence to these principles is mandatory for the success of the project.

## 1. DRY (Don't Repeat Yourself)

*   All code segments, functions, and classes should have a single, well-defined purpose.
*   Avoid duplication of logic and data structures across multiple files.
*   Refactor existing code whenever possible to simplify and consolidate functionality.

## 2. KISS (Keep It Simple, Stupid)

*   Prioritize clarity and readability over complex or unnecessarily verbose solutions.
*   Strive for minimal code that achieves the desired outcome.
*   Use appropriate data structures and algorithms for the task.
*   Favor straightforward implementation over overly clever, potentially error-prone solutions.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class/module should have one, and only one, reason to change.
*   **Open/Closed Principle:** The system should be extensible without modifying the core implementation.
*   **Liskov Substitution Principle:**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients should not be forced to depend on methods they do not use.
*   **Dependency Inversion Principle:**  High-level modules should be dependent on abstractions, not concrete implementations.

## 4. YAGNI (You Aren't Gonna Need It)

*   Avoid implementing features or functionalities that are not currently required.
*   Focus solely on the immediate task and avoid unnecessary complexity.
*   Defer implementation of advanced features until they are explicitly requested.

## 5. Development Process & Code Structure

*   **File Size Limit:** Each file must be no more than 180 lines of code.
*   **Modularization:**  Divide code into logically related modules/components.
*   **Comments:**  Provide clear and concise comments explaining the *why* behind code, not just the *what*.
*   **Naming Conventions:** Follow consistent naming conventions (e.g., snake_case).
*   **Documentation:** Provide brief documentation for each class/function/module to aid understanding.
*   **Error Handling:** Implement basic error handling and logging for robustness.

## 6. Testing Strategy

*   **Unit Tests:** All code must be thoroughly unit tested to verify individual components.
*   **Integration Tests:**  Integrate and test the interaction of multiple modules.
*   **Test Coverage:** Aim for at least 80% code coverage.
*   **Test Driven Development:**  Unit tests should be written *before* code implementation.
*   **Mocking/Stubbing:**  **DO NOT USE MOCKS.**  All dependencies (services, databases, external APIs) must be mocked or stubbed to allow for complete and reproducible tests.


## 7. Code Standards & Formatting

*   **Indentation:** Use 2 spaces for indentation.
*   **Line Length:** Keep lines of code under 120 characters.
*   **Whitespace:** Use consistent whitespace around operators and keywords.
*   **Blank Lines:** Separate logical blocks of code with blank lines.

## 8.  Specific Requirements (Examples - Modify as needed)

*   **Data Structures:**  Use appropriate data structures for each task (e.g., dictionaries, lists, trees).
*   **Algorithms:**  Utilize efficient algorithms where applicable.
*   **API Design:**  Follow a consistent API design philosophy for future expansion.
*   **Logging:** Implement basic logging to track events and errors.


## 9.  Deliverables

*   All files must be saved in the `AGENTS.md` directory.
*   Documented unit tests for all code segments.
*   Comprehensive code review performed by at least two team members.

## 10.  Future Considerations

*   Add dependency injection framework to manage dependencies.
*   Implement a basic version control system.
*   Consider adding support for asynchronous operations.


These guidelines are critical to ensure the quality, maintainability, and stability of the AGENTS.md repository.  Any deviation from these standards will be subject to review and potential rejection.
```