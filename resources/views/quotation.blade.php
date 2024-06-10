<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quotation</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h3 { text-align: center; }
        p { font-size: 14px; }
        ul { list-style-type: none; padding: 0; }
        ul li { padding-left: 20px; position: relative; }
        ul li:before { content: "✔"; position: absolute; left: 0; }
    </style>
</head>
<body>
    <h3>Quotation - {{ $data['plan'] }} Plan</h3>
    <p><strong>Customer Name:</strong> {{ $data['name'] }}</p>
    <p><strong>Customer Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Contact Number:</strong> {{ $data['phoneNumber'] }}</p>
    <p><strong>Plan Cost:</strong> ${{ $cost }}/per-project</p>
    <p><strong>Features:</strong></p>
    <ul>
        @foreach ($features as $feature)
            <li>{{ $feature }}</li>
        @endforeach
    </ul>
    <p>Thank you for choosing Duck Cloud for your web service needs!</p>
</body>
</html>
