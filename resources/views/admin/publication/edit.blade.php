@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.publication.update', $publication->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put" />
                    <div class="card-title">Publications Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Publication Title</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{old('title')??$publication->name}}">
                            @if ($errors->has('title') )
                            <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Tags (Add tags by comma seprated)</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="tags" value="{{ old('tags') ?? $publication->tags }}" placeholder="trending, uploads, watch">
                            @if ($errors->has('tags') )
                            <span style="color:red">
                                {{ $errors->first('tags') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload File</div>
                        <div class="col-lg-8">
                            <input type="file" name="publication" />
                            @if ($errors->has('publication') )
                            <span style="color:red">
                                {{ $errors->first('publication') }}
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