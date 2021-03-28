@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.event.update', $event->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put" />
                    <div class="card-title">Events Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Name</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{old('title') ?? $event->name}}">
                            @if ($errors->has('title') )
                            <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Description</div>
                        <div class="col-lg-8">
                            <textarea name="description" class="form-control" cols="30" rows="10">{{ old('description') ?? $event->description }}</textarea>
                            @if ($errors->has('description') )
                            <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload Image</div>
                        <div class="col-lg-8">
                            <input type="file" name="image" />
                            @if ($errors->has('image') )
                            <span style="color:red">
                                {{ $errors->first('image') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Start Date</div>
                        <div class="col-lg-8">
                            <input type="date" class="form-control" name="start_date" value="{{ old('start_date') ?? $event->start_date }}">
                            @if ($errors->has('start_date') )
                            <span style="color:red">
                                {{ $errors->first('start_date') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">End Date</div>
                        <div class="col-lg-8">
                            <input type="date" class="form-control" name="end_date" value="{{ old('end_date') ?? $event->end_date }}">
                            @if ($errors->has('end_date') )
                            <span style="color:red">
                                {{ $errors->first('end_date') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Location</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="location" value="{{old('location') ?? $event->location}}">
                            @if ($errors->has('location') )
                            <span style="color:red">
                                {{ $errors->first('location') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    
                    <input class="btn btn-primary" type="submit" value="Upload">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection