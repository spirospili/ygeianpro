@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form id="pub_submit" method="post" action="{{ route('admin.publication.store') }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <div class="card-title">Publications Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Publication Title</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{old('title')}}">
                            @if ($errors->has('title') )
                            <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Select Doctor</div>
                        <div class="col-lg-8">
                            <select name="doctor" class="form-control" required>
                                <option value="">Select Doctor</option>
                                @foreach($doctors as $doctor)
                                <option value="{{ $doctor->id }}" {{ old('doctor') == $doctor->id ? 'selected' : '' }}>{{ $doctor->name }}</option>
                                @endforeach
                            </select>
                            @if ($errors->has('doctor') )
                            <span style="color:red">
                                {{ $errors->first('doctor') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Tags (Add tags by comma seprated)</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="tags" value="{{old('tags')}}" placeholder="trending, uploads, watch">
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
                            <input type="file" name="publication" required />
                            <br>
                            <br>
                            <div class="progress d-none">
                                <div class="bar"></div >
                                <div class="percent">0%</div >
                            </div>
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

@section('scripts')
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script>

    <script type="text/javascript">


        (function() {

            var progress = $('.progress');
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            $('#pub_submit').ajaxForm({
                beforeSend: function() {
                    progress.removeClass('d-none');
                    status.empty();
                    var percentVal = '0%';
                    var posterValue = $('input[name=publication]').fieldValue();
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                success: function() {
                    var percentVal = 'Wait, Saving';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                complete: function(xhr) {
                    status.html(xhr.responseText);
                    window.location.pathname = "admin/publication";
                }
            });

        })();
    </script>
@endsection