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
                        <div class="col-lg-3">Hospital</div>
                        <div class="col-lg-8">
                        
                        <select class="form-control form-select" name="hospital"  aria-label="">
                        @foreach($hospitals as $hospital)

                            <option  value="{{$hospital->id}}">{{$hospital->hospital_name}}</option>
                    
                        @endforeach

                        </select>                            @if ($errors->has('speciality') )
                            <span style="color:red">
                                {{ $errors->first('speciality') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-3">Society</div>
                        <div class="col-lg-8">
                        
                        <select class="form-control form-select" name="society"  aria-label="">
                        @foreach($societies as $society)

                            <option  value="{{$society->id}}">{{$society->society_name}}</option>
                    
                        @endforeach

                        </select>                            @if ($errors->has('speciality') )
                            <span style="color:red">
                                {{ $errors->first('speciality') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-3">Speciality</div>
                        <div class="col-lg-8">
                        <select class="form-control form-select" name="speciality"  aria-label="">
                        @foreach($specialities as $speciality)
                          @if($speciality->speciality==$doctor->speciality)
                                <option  value="{{$speciality->speciality}}" selected>{{$speciality->speciality}}</option>
                          @else
                                <option  value="{{$speciality->speciality}}" >{{$speciality->speciality}}</option>
                          @endif
                        @endforeach

                        </select>        
                            @if ($errors->has('speciality') )
                            <span style="color:red">
                                {{ $errors->first('speciality') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Tag:</div>
                        <div class="col-lg-8">
                        <select class="form-control form-select" name="tags" value="{{old('tags')}}"  aria-label="">
                            @if ($doctor->tags=="Regular")
                                	<option  value="Regular" selected>Regular</option>
                                    <option  value="Top" >Top</option>

                            @else 
                                	<option  value="Top" selected>Top</option>
                                    <option  value="Regular">Regular</option>

                            @endif
                        </select>
                            @if ($errors->has('tags') )
                            <span style="color:red">
                                {{ $errors->first('tags') }}
                            </span>
                            @endif

                        </div> 
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-3">Sub-Speciality (Add by comma seprated)</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="subspeciality" value="{{old('subspeciality') ?? $doctor->subspeciality }}" placeholder="trending, uploads, watch">
                            
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

                    <!-- The new three fields for edit -->

                    <div class="form-group row">
                        <div class="col-lg-3">Academic Skills</div>
                        <div class="col-lg-8">
                            <textarea name="academicskills" class="form-control">{{ old('academicskills') }}</textarea>
                            @if ($errors->has('academicskills') )
                            <span style="color:red">
                                {{ $errors->first('academicskills') }}
                            </span>
                            @endif
                            <p><small>Total 1000 words</small></p>
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Professional Skills</div>
                        <div class="col-lg-8">
                            <textarea name="professionalskills" class="form-control">{{ old('professionalskills') }}</textarea>
                            @if ($errors->has('professionalskills') )
                            <span style="color:red">
                                {{ $errors->first('professionalskills') }}
                            </span>
                            @endif
                            <p><small>Total 1000 words</small></p>
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Milestones</div>
                        <div class="col-lg-8">
                            <textarea name="milestones" class="form-control">{{ old('milestones') }}</textarea>
                            @if ($errors->has('milestones') )
                            <span style="color:red">
                                {{ $errors->first('milestones') }}
                            </span>
                            @endif
                            <p><small>Total 1000 words</small></p>
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
