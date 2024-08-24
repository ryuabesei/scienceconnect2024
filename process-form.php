<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => '必須項目を正しく入力してください。']);
        exit;
    }

    $to = 'igemjapan31@gmail.com'; // フォームに記載されていたメールアドレス
    $subject = 'サイエンスコネクト2024からの新しい問い合わせ';
    $email_content = "名前: $name\n";
    $email_content .= "メールアドレス: $email\n\n";
    $email_content .= "メッセージ:\n$message\n";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['success' => true, 'message' => 'お問い合わせありがとうございます。すぐに返信いたします。']);
    } else {
        echo json_encode(['success' => false, 'message' => 'メッセージの送信中にエラーが発生しました。']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '不正なリクエストです。']);
}
?>