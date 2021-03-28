@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.live.store') }}">
                    {{ @csrf_field() }}
                    <div class="card-title">Go Live Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Paste Youtube Live url</div>
                        <div class="col-lg-8">
                            <input type="url" class="form-control" name="url" value="{{ $session->url ?? '' }}">
                        </div> 
                    </div>
                    @if(!isset($session->id))
                    <input class="btn btn-primary" type="submit" value="Start Live Session">
                    @endif
                </form>
                @if(isset($session->id))
                <form method="post" action="{{  url('admin/live/') . '/'. $session->id}}">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put" />
                    <input type="hidden" name="status" value="closed">
                    <input class="btn btn-primary" type="submit" value="Close Live Session">
                </form>
                @endif
            </div>
        </div>
    </div>    
</div>
					
@endsection