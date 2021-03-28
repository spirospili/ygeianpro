<!DOCTYPE html>
<html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>

    <?php
    $style = [
        /* Layout ------------------------------ */
        'body' => 'margin: 0; padding: 0; width: 100%; background-color: #F2F4F6;text-align:left;',
        'email-wrapper' => 'width: 100%; margin: 0; padding: 0; background-color: #F2F4F6;',
        /* Masthead ----------------------- */
        'email-masthead' => 'padding: 25px 0 0;',
        'email-masthead_name' => 'font-size: 16px; font-weight: bold; color: #2F3133; text-decoration: none; text-shadow: 0 1px 0 white;',
        'email-body' => 'width: 100%; margin: 0; padding: 0; border-top: 1px solid #EDEFF2; border-bottom: 1px solid #EDEFF2;',
        'email-body_inner' => 'width: auto; max-width: 570px; margin: 0 auto; padding: 0;border: 5px solid #ec1c23;',
        'email-body_cell' => 'padding: 0 35px;',
        'email-footer' => 'width: auto; max-width: 570px; margin: 0 auto; padding: 0;',
        'email-footer_cell' => 'color: #AEAEAE; padding: 0 35px;',
        /* Body ------------------------------ */
        'body_action' => 'width: 100%; margin: 30px auto; padding: 0;',
        'body_sub' => 'margin-top: 25px; padding-top: 25px; border-top: 1px solid #EDEFF2;',
        /* Type ------------------------------ */
        'anchor' => 'color: #3869D4;',
        'header-1' => 'margin-top: 0; color: #2F3133; font-size: 19px; font-weight: bold;padding:0 35px',
        'paragraph' => 'margin-top: 0; color: #1b1a1a; font-size: 14px; line-height: 1.5em;',
        'paragraph-sub' => 'margin: 0; color: #74787E; font-size: 12px; line-height: 1.5em;',
        'paragraph-center' => 'text-align: center;',
        'paragraph-notification' => 'font-size:13px;color:#615e5e',
        'weblink' => 'margin-top:0;text-align:center',
        /* Buttons ------------------------------ */
        'button-default' => 'background: #ec1c23;color: #fff;padding: 12px 30px;
                    display: inline-block;font-size: 20px;text-decoration:none;
                    transform: skewX(-20deg)',
        'button-default-span' => 'skewX(20deg)',
        'button--green' => 'background-color: #22BC66;',
        'button--red' => 'background-color: #ec1c23;',
        'button--blue' => 'background-color: #3869D4;',
    ];
    ?>

    <?php $fontFamily = 'font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;'; ?>

    <body style="{{ $style['body'].$fontFamily }}">

    <p style="text-align: center"> <img src="{{ asset('imgpsh_fullsize_anim.png')}}"></p>
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td style="{{ $style['email-wrapper'] }}" align="center">
                    <table style="{{ $style['email-body_inner'] }}" width="100%" cellpadding="0" cellspacing="0">
                        

                        <!-- Email Body -->
                        <tr>
                            <td width="100%">
                                <table  align="center" width="570" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="{{ $fontFamily }} {{ $style['email-body_cell'] }}">
                                            <p>{{$name_contact}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="{{ $fontFamily }} {{ $style['email-body_cell'] }}">
                                            <p>{{$email_contact}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="{{ $fontFamily }} {{ $style['email-body_cell'] }}">
                                            <p>{{$subject_contact}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="{{ $fontFamily }} {{ $style['email-body_cell'] }}">
                                            <p>{{$message_contact}}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td>
                                <table style="{{ $style['email-footer'] }}" align="center" width="570" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="{{ $fontFamily }} {{ $style['email-footer_cell'] }}">

                                            <p style="{{ $style['paragraph-sub'] }}">
                                                &copy; {{date('Y')}}, Ygeian, Inc, All Rights Reserved
                                            </p>
                                            <p style="{{ $style['weblink'] }}"><a href="http://www.ygeianpro.com" target="_blank">http://www.ygeianpro.com</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
