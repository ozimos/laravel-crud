<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Product;


class ProductsTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testsProductsAreCreatedCorrectly()
    {
        $user = factory(User::class)->create();
        $token = $user->generateToken();
        $headers = ['Authorization' => "Bearer $token"];
        $payload = [
            'title' => 'Lorem',
            'description' => 'Ipsum',
            'price' => 100,
            'availability' => 1
        ];

        $this->json('POST', '/api/products', $payload, $headers)
            ->assertStatus(201)
            ->assertJson(['id' => 51, 'title' => 'Lorem', 'description' => 'Ipsum', 'price' => 100,
            'availability' => 1]);
    }

    public function testsProductsAreUpdatedCorrectly()
    {
        $user = factory(User::class)->create();
        $token = $user->generateToken();
        $headers = ['Authorization' => "Bearer $token"];
        $product = factory(Product::class)->create([
            'title' => 'First Article',
            'description' => 'First Body',
            'price' => 100,
            'availability' => 1
        ]);

        $payload = [
            'title' => 'Lorem',
            'description' => 'Ipsum',
            'price' => 100,
            'availability' => 1
        ];

        $response = $this->json('PUT', '/api/products/' . $product->id, $payload, $headers)
            ->assertStatus(200)
            ->assertJson([ 
                'id' => 51, 
                'title' => 'Lorem', 
                'description' => 'Ipsum',
                'price' => 100,
            'availability' => 1 
            ]);
    }

    public function testsProductsAreDeletedCorrectly()
    {
        $user = factory(User::class)->create();
        $token = $user->generateToken();
        $headers = ['Authorization' => "Bearer $token"];
        $product = factory(Product::class)->create([
            'title' => 'First Article',
            'description' => 'First Body',
            'price' => 100,
            'availability' => 1
        ]);

        $this->json('DELETE', '/api/products/' . $product->id, [], $headers)
            ->assertStatus(204);
    }

    public function testProductsAreListedCorrectly()
    {
        Product::truncate();
        
        factory(Product::class)->create([
            'title' => 'First Article',
            'description' => 'First Body',
            'price' => 100,
            'availability' => 1
        ]);

        factory(Product::class)->create([
            'title' => 'Second Article',
            'description' => 'Second Body',
            'price' => 100,
            'availability' => 1
        ]);

        $user = factory(User::class)->create();
        $token = $user->generateToken();
        $headers = ['Authorization' => "Bearer $token"];

        $response = $this->json('GET', '/api/products', [], $headers)
            ->assertStatus(200)
            ->assertJson([
                [ 'title' => 'First Article', 'description' => 'First Body', 'price' => 100,
                'availability' => 1 ],
                [ 'title' => 'Second Article', 'description' => 'Second Body', 'price' => 100,
                'availability' => 1 ]
            ])
            ->assertJsonStructure([
                '*' => ['id', 'description', 'title', 'created_at', 'updated_at'],
            ]);
    }
}
