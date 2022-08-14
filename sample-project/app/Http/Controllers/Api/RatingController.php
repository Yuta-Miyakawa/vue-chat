<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\RatingController;
use Illuminate\Http\Request;
use Api\Http\Resoueces\RatingResource;
use Api\Models\Books;
use Api\Models\Ratings;

class RatingController extends Controller

{

public function store(Request $request, Book $book)
    {
      $rating = Rating::firstOrCreate(
        [
          'user_id' => $request->user()->id,
          'book_id' => $book->id,
        ],
        ['rating' => $request->rating]
      );

      return new RatingResource($rating);
    }

}