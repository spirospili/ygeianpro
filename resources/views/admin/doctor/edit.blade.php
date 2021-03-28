@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.doctor.update', $doctor->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put"/>
                    <div class="card-title">Doctors Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Doctor Name</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="name" value="{{ old('name') ??$doctor->name }}">
                            @if ($errors->has('name') )
                            <span style="color:red">
                                {{ $errors->first('name') }}
                            </span>
                            @endif

                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Speciality</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="speciality" value="{{old('speciality') ?? $doctor->speciality}}">
                            @if ($errors->has('speciality') )
                            <span style="color:red">
                                {{ $errors->first('speciality') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Tags (Add tags by comma seprated)</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="tags" value="{{old('tags') ?? $doctor->tags}}" placeholder="trending, uploads, watch">
                            @if ($errors->has('tags') )
                            <span style="color:red">
                                {{ $errors->first('tags') }}
                            </span>
                            @endif

                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Doctor Description</div>
                        <div class="col-lg-8">
                            <textarea name="description" class="form-control">{{old('description') ?? $doctor->description}}</textarea>
                            @if ($errors->has('description') )
                            <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload File</div>
                        <div class="col-lg-8">
                            <input type="file" name="doctor" />
                            @if ($errors->has('doctor') )
                            <span style="color:red">
                                {{ $errors->first('doctor') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload Logo</div>
                        <div class="col-lg-8">
                            <input type="file" name="logo" />
                            @if ($errors->has('logo') )
                            <span style="color:red">
                                {{ $errors->first('logo') }}
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
