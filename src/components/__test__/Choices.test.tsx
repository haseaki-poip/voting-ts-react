import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Create from "../Create";

describe("Test Choices Component", () => {
  // 初期状態のtextboxの数テスト
  test("render choicesUI", async () => {
    render(<Create />);
    const textbox = screen.getAllByRole("textbox");
    expect(textbox).toHaveLength(1);
  });

  // +-ボタン押した時のテスト
  test("push button", async () => {
    render(<Create />);
    // プラスボタンを押した時のテスト
    const plusButton = screen.getByRole("button", { name: "+" });
    user.click(plusButton);
    let textbox = screen.getAllByRole("textbox");
    expect(textbox).toHaveLength(2);

    const minusButton = screen.getByRole("button", { name: "-" });
    user.click(minusButton);
    textbox = screen.getAllByRole("textbox");
    expect(textbox).toHaveLength(1);

    // 6回プラスボタンを押しても数は5かどうか
    for (let i = 0; i <= 5; i++) {
      user.click(plusButton);
    }
    textbox = screen.getAllByRole("textbox");
    expect(textbox).toHaveLength(5);

    // textが0以下にならないかどうか
    for (let i = 0; i <= 6; i++) {
      user.click(minusButton);
    }
    textbox = screen.getAllByRole("textbox");
    expect(textbox).toHaveLength(1);
  });

  // 入力テキストの表示内容テスト
  test("confirm inputValue with button", async () => {
    render(<Create />);
  });
});
