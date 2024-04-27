<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\EmailTemplate;
use App\Models\Vaccines;
use App\Models\User;
class VaccineApprovalMailbyAdmin extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $vaccine;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Vaccines $vaccine)
    {
        $this->user = $user;
        $this->vaccine = $vaccine;
    }



    public function build()
    {
        $master_template = EmailTemplate::get_master_template();
        $template = EmailTemplate::get_by_slug('vaccine-approval-by-admin');
        if ($template) {
            $subject = $template->subject;
            $body = $template->body;
            $body = $this->ReplaceEmailValues('body', $body);
            
            $final_body = str_replace('[body]', $body, $master_template);
          
            return $this->subject($subject)
                ->html($final_body);
        }
    }
    

    public function ReplaceEmailValues($type, $html = '')
    {
        switch ($type) {
            case 'body':
                $html = str_replace('[name]', !empty($this->user->fname) ? $this->user->fname : '', $html);
                $html = str_replace('[vaccine-name]', !empty($this->vaccine->vaccine_name) ? $this->vaccine->vaccine_name : '', $html);
                break;
        }
        return $html;
    }
}
