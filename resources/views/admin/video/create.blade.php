@extends('admin.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <form id="video_pub" method="post" action="{{ route('admin.video.store') }}" enctype="multipart/form-data">
                        {{ @csrf_field() }}
                        <div class="card-title">Video Upload Setting</div>
                        <div class="form-group row">
                            <div class="col-lg-3">Select Type</div>
                            <div class="col-lg-8">
                                <select name="type" class="form-control" required>
                                    <option value="free" {{ old('type') == 'free' ? 'selected' : '' }}>Free</option>
                                    <option value="paid" {{ old('type') == 'paid' ? 'selected' : '' }}>Paid</option>
                                </select>
                                @if ($errors->has('type') )
                                    <span style="color:red">
                                {{ $errors->first('type') }}
                            </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-3">Video Title</div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" name="title" value="{{old('title')}}" required>
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
                                        <option value="{{$doctor->id}} {{$doctor->hospital_id}}" {{ old('doctor') == $doctor->id ? 'selected' : '' }}>{{ $doctor->name }}</option>
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
                            <div class="col-lg-3">Video Description</div>
                            <div class="col-lg-8">
                                <textarea name="description" class="form-control" required>{{ old('description') }}</textarea>
                                @if ($errors->has('description') )
                                    <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                                @endif
                                <p><small>Total 1000 words</small></p>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-3">Tags (Add tags by comma seprated)</div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" name="tags" placeholder="trending, uploads, watch">
                                @if ($errors->has('tags') )
                                    <span style="color:red">
                                {{ $errors->first('tags') }}
                            </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-3">Upload Video</div>
                            <div class="col-lg-8">
                                <input type="file" name="video" required />
                                <br>
                                <br>
                                <div class="progress d-none">
                                    <div class="bar"></div >
                                    <div class="percent">0%</div >
                                </div>
                                @if ($errors->has('video') )
                                    <span style="color:red">
                                {{ $errors->first('video') }}
                            </span>
                                @endif
                                <p><small>Supported format: MP4</small></p>
                            </div>
                        </div>

                        <input class="btn btn-primary" type="submit" value="Upload Video">

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

            $('#video_pub').ajaxForm({
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
                    window.location.pathname = "admin/video";
                }
            });

        })();
    </script>
@endsection