<?php

namespace App\Http\Controllers\Frontend;

use App\Models\User;
use App\Models\Newsletter;
use App\Models\Doctor;
use App\Mail\Newsletter as MailNewsletter;
use App\Mail\Invite as MailInvitation;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;

class AuthController
{
    use SendsPasswordResetEmails;
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'profession' => $request->type ?? 'student',
            'speciality' => $request->speciality,
        ]);

        $user->save();

        $details = [
            'title' => 'Account Created',
            'body' => 'Your account has been created successfully',
        ];
        $user->notify(new PushNotification($details));

        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ], 201);
    }


    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized Access, The email or password you provided is not working.'
            ], 401);

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'image' => $user->image,
            'payment_id' => $user->payment_id,
            'payment_info' => $user->payment_info,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ], 201);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }


    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $this->validateEmail($request);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
                    ? ['message' => 'An email has been sent to reset the password.']
                    : response()->json([
                        'message' => 'The given data was invalid.',
                        'errors' => ['email' => [trans($response)]]
                    ], 422);
    }

    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function contact(Request $request)
    {
        try{
            Mail::send('emails.contact',
                array(
                    'name_contact' => $request->name,
                    'email_contact' => $request->email,
                    'subject_contact' => $request->subject,
                    'message_contact' => $request->message,
                ), function($message){
                $message->from('ygieanpro@gmail.com', 'YgeianPro');
                $message->to('spirospiliousis@gmail.com', 'YgeianPro');
                $message->to('gfx.adil@gmail.com', 'YgeianPro');
                $message->to('ghulamali2612@gmail.com', 'YgeianPro');
                $message->to('irtiza.gt@gmail.com', 'YgeianPro');
                $message->to('mahadbajwa97@gmail.com', 'YgeianPro');
                $message->subject('Contact Submitted');
            });
            return response()->json([
                'success' => true,
                'message' => 'message sent successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'failed' => true,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function subscribe(Request $request){

        if($request->email){
            if(!Newsletter::where('email',$request->email)->exists()){
                $newsletter = new Newsletter;
                $newsletter->email = $request->email;
                $newsletter->save();

                Mail::to($request->email)->send(new MailNewsletter());
               return  response()->json(["message" => "Congratulations! You have been subscribed to ygeianpro.com"]);
            }else{
                return response()->json(["message" => "The email address already exist in our database"]);
            }
        }
    }
    public function invite(Request $request){
          
        if($request->email){
                $doctor = Doctor::findOrFail($request->doctorID);
                $Emails = str_replace(' ', '', $request->email);
                $Emails = explode(',', $Emails);
                

                foreach ($Emails as $email) 
                {
                    Mail::to($email)->send(new MailInvitation($doctor));   
                }
                
               return  response()->json(["message" => "The Invitations have been sent"]);
            
        }
    }
}