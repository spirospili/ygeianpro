@component('mail::message')
# Introduction

Thank you for subscribing to {{ config('app.name') }}.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
