<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try{

        $allContacts = Contact::all();
           
            return response([
                'status' => 200,
                'message' => 'All Contact',
                'data' => $allContacts
            ]);

        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => "Something went wrong",
            ], 500);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{

            $validation = Validator::make($request->all(), [                
                'name' => ['required', 'string'],
                'email' => ['required', 'email'],
            ]);
            if ($validation->fails()) {
                return response()->json([
                    'status' => '422',
                    'message' => 'Validation Failed',
                    'errors' => $validation->getMessageBag()->getMessages()
                ], 422);
    
            }
        
            Contact::create($request->all());
            return response([
                'status' => true,
                'message' => 'Contact Saved Successfully',          
            ], 200);

        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => "Something went wrong",
            ], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    
    public function edit($id)
    {
        try {
        $data = Contact::findOrFail($id);

        return response([
            'status' => true,
            'message' => 'All Contact',
            'data' => $data 
        ], 200);

        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => "Something went wrong",
            ], 500);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        try {

         Contact::where('id', $request->id)->update($request->all());

            return response([
                'status' => true,
                'message' => 'Contact updated Successfully',
            ], 200);

        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => "Something went wrong",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

        Contact::where('id', $id)->delete();

            return response([
                'status' => true,
                'message' => 'Contact deleted Successfully',
            ], 200);

        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => "Something went wrong",
            ], 500);
        }

    }
}
