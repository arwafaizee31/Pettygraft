<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $mailData['title'] }}</title>
</head>
<body>
    <h1>{{ $mailData['title'] }}</h1>
    {{-- <h2>{{ $mailData['body'] }}</h2> --}}
    <h1>{{ $mailData['pet_name'] }}</h1>
    <p>Pet Date of Birth: {{ $mailData['pet_dob'] }}</p>
    
    @if(!empty($mailData['vaccines']))
        <h3>Vaccines Information:</h3>
        <ul>
            @foreach($mailData['vaccines'] as $vaccine)
                <li>
                    <strong>Vaccine Name:</strong> {{ $vaccine['vaccine_name'] }} <br>
                    <strong>Min Age:</strong> {{ $vaccine['min_age'] }} <br>
                    <strong>Max Age:</strong> {{ $vaccine['max_age'] }}
                </li>
            @endforeach
        </ul>
    @else
        <p>No vaccines information available for this pet.</p>
    @endif
    <h2>Owner details: </h2>
<h3>Owner Name: {{ $mailData['user_name']}} </h2>
<h3>Owner email: {{ $mailData['user_email']}}</h3>
    <h2>Thank you</h2>
</body>
</html>
